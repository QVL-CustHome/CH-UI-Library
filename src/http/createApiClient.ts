import { ApiError } from "./ApiError";

export interface ApiClientOptions {
  basePath: string;
  withRefresh?: boolean;
  refreshPath?: string;
}

export interface ApiClient {
  request: <T>(path: string, init?: RequestInit) => Promise<T>;
}

function isFormData(body: BodyInit | null | undefined): body is FormData {
  return typeof FormData !== "undefined" && body instanceof FormData;
}

function buildHeaders(init: RequestInit | undefined): HeadersInit | undefined {
  if (isFormData(init?.body)) {
    return init?.headers;
  }
  return { "Content-Type": "application/json", ...(init?.headers ?? {}) };
}

async function parseError(res: Response): Promise<ApiError> {
  let message = `Erreur ${res.status}`;
  let code: string | undefined;
  try {
    const body = await res.json();
    if (typeof body?.error === "string") code = body.error;
    if (typeof body?.message === "string") message = body.message;
    else if (code) message = code;
  } catch {
    message = `Erreur ${res.status}`;
  }
  return new ApiError(res.status, message, code);
}

async function parseBody<T>(res: Response): Promise<T> {
  if (res.status === 204) return undefined as T;
  const text = await res.text();
  return (text ? JSON.parse(text) : undefined) as T;
}

export function createApiClient({
  basePath,
  withRefresh = false,
  refreshPath = "/api/auth/refresh",
}: ApiClientOptions): ApiClient {
  let refreshInFlight: Promise<boolean> | null = null;

  const tryRefresh = (): Promise<boolean> => {
    if (refreshInFlight) return refreshInFlight;
    refreshInFlight = fetch(refreshPath, {
      method: "POST",
      credentials: "same-origin",
    })
      .then((r) => r.ok)
      .catch(() => false)
      .finally(() => {
        refreshInFlight = null;
      });
    return refreshInFlight;
  };

  const rawFetch = (path: string, init?: RequestInit): Promise<Response> =>
    fetch(`${basePath}${path}`, {
      credentials: "same-origin",
      ...init,
      headers: buildHeaders(init),
    });

  const request = async <T>(path: string, init?: RequestInit): Promise<T> => {
    let res = await rawFetch(path, init);

    if (res.status === 401 && withRefresh) {
      const refreshed = await tryRefresh();
      if (refreshed) {
        res = await rawFetch(path, init);
      }
    }

    if (!res.ok) {
      throw await parseError(res);
    }
    return parseBody<T>(res);
  };

  return { request };
}
