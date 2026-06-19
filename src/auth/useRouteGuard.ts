import { useEffect, useState } from "react";

export type RouteGuardState<TUser> =
  | { status: "loading" }
  | { status: "ok"; user: TUser }
  | { status: "forbidden" }
  | { status: "error" };

export interface UseRouteGuardParams<TUser> {
  fetchUser: () => Promise<TUser>;
  hasAccess: (user: TUser) => boolean;
  isUnauthorizedError: (error: unknown) => boolean;
  onUnauthorized: () => void;
}

export function useRouteGuard<TUser>({
  fetchUser,
  hasAccess,
  isUnauthorizedError,
  onUnauthorized,
}: UseRouteGuardParams<TUser>): RouteGuardState<TUser> {
  const [state, setState] = useState<RouteGuardState<TUser>>({
    status: "loading",
  });

  useEffect(() => {
    let active = true;
    fetchUser()
      .then((user) => {
        if (!active) return;
        setState(
          hasAccess(user) ? { status: "ok", user } : { status: "forbidden" }
        );
      })
      .catch((error) => {
        if (!active) return;
        if (isUnauthorizedError(error)) {
          onUnauthorized();
          return;
        }
        setState({ status: "error" });
      });
    return () => {
      active = false;
    };
  }, []);

  return state;
}
