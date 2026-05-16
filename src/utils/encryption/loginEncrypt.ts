import { LOGIN_ENCRYPTION_SECRET } from '@/config/secrets';
import CryptoJS from 'react-native-crypto-js';

const SECRET_KEY = LOGIN_ENCRYPTION_SECRET;

/** Encrypt — same contract as legacy `encryptData`. */
export function encryptData(data: string): string {
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
}

/** Decrypt — same contract as legacy `decryptData`. */
export function decryptData(data: string): string {
  const bytes = CryptoJS.AES.decrypt(data, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}

/** Alias used by login screen — identical to `encryptData`. */
export function encryptLoginField(plain: string): string {
  return encryptData(plain);
}
