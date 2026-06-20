export function navigateTo(url: string): void {
  window.location.assign(url);
}

export const REDIRECT_INTENT_PARAM = "redirect";

export interface ChLoginUrlOptions {
  authPortalUrl: string;
  loginPath?: string;
  redirectCookieName?: string;
  redirectCookieMaxAge?: number;
}

export function buildLoginUrl({
  authPortalUrl,
  loginPath = "/login",
  redirectCookieName = "ch_redirect",
  redirectCookieMaxAge = 300,
}: ChLoginUrlOptions): string {
  const redirect = encodeURIComponent(window.location.href);
  document.cookie = `${redirectCookieName}=${redirect}; path=/; max-age=${redirectCookieMaxAge}; SameSite=Lax`;
  const loginUrl = new URL(loginPath, authPortalUrl);
  loginUrl.searchParams.set(REDIRECT_INTENT_PARAM, "1");
  return loginUrl.toString();
}
