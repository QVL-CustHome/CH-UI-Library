export function navigateTo(url: string): void {
  window.location.assign(url);
}

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
  return `${authPortalUrl}${loginPath}`;
}
