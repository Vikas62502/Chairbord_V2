/**
 * Central place to align with your legacy API paths.
 * If OTP verify fails with 404, update `AGENT_MOBILE_OTP_VERIFY` to match the old `VerifyOTP` call.
 */
export const LOGIN_ENDPOINTS = {
  agent: '/login/agent',
  agentMobileOtp: '/login/agent-mobile',
  /** Second step after "Get OTP" — adjust to match legacy VerifyOTP. */
  agentMobileOtpVerify: '/login/agent-mobile-verify',
  checkToken: '/login/check-token',
} as const;
