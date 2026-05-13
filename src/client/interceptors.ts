import { getApiBaseUrl } from '@/config/api';
import {
  AUTH_ACCESS_TOKEN_KEY,
  AUTH_REFRESH_TOKEN_KEY,
  clearAuthSession,
  getCache,
  setCache,
} from '@/services/storage';
import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';

/** No interceptors — avoids refresh → 401 → refresh loops. */
const refreshClient = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: 20_000,
  headers: { 'Content-Type': 'application/json' },
});

type RequestConfig = InternalAxiosRequestConfig & { _retry?: boolean };

let refreshPromise: Promise<string | null> | null = null;

function startTokenRefresh(): Promise<string | null> {
  if (!refreshPromise) {
    const attempt = (async (): Promise<string | null> => {
      const refreshToken = await getCache(AUTH_REFRESH_TOKEN_KEY);
      if (!refreshToken) {
        await clearAuthSession();
        return null;
      }
      try {
        const { data } = await refreshClient.post<{ accessToken?: string }>(
          '/login/refresh-token',
          { refreshToken },
        );
        const newAccessToken = data?.accessToken;
        if (!newAccessToken) {
          await clearAuthSession();
          return null;
        }
        await setCache(AUTH_ACCESS_TOKEN_KEY, newAccessToken);
        return newAccessToken;
      } catch {
        await clearAuthSession();
        return null;
      }
    })();
    refreshPromise = attempt.finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
}

function setBearer(config: InternalAxiosRequestConfig, token: string): void {
  const headers = config.headers;
  if (!headers) {
    return;
  }
  if (typeof headers.set === 'function') {
    headers.set('Authorization', `Bearer ${token}`);
    return;
  }
  (headers as Record<string, string>).Authorization = `Bearer ${token}`;
}

function isRefreshCall(config: InternalAxiosRequestConfig): boolean {
  const url = config.url ?? '';
  return url.includes('/login/refresh-token');
}

const onRequest = async (
  config: InternalAxiosRequestConfig,
): Promise<InternalAxiosRequestConfig> => {
  const token = await getCache(AUTH_ACCESS_TOKEN_KEY);
  if (token) {
    setBearer(config, token);
  }
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> =>
  Promise.reject(error);

const onResponse = (response: AxiosResponse): AxiosResponse => response;

const onResponseError = async (
  error: AxiosError,
  api: AxiosInstance,
): Promise<unknown> => {
  const originalRequest = error.config as RequestConfig | undefined;

  if (error.response?.status !== 401 || !originalRequest) {
    return Promise.reject(error);
  }

  if (isRefreshCall(originalRequest)) {
    await clearAuthSession();
    return Promise.reject(error);
  }

  if (originalRequest._retry) {
    return Promise.reject(error);
  }

  const newAccessToken = await startTokenRefresh();
  if (!newAccessToken) {
    return Promise.reject(error);
  }

  originalRequest._retry = true;
  setBearer(originalRequest, newAccessToken);
  return api.request(originalRequest);
};

export function setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(
    onResponse,
    (err: AxiosError) => onResponseError(err, axiosInstance),
  );
  return axiosInstance;
}
