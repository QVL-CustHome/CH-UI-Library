import type { ReactNode } from "react";
import { RouteGuard } from "./RouteGuard";
import type { UseRouteGuardParams } from "./useRouteGuard";

export interface CreateRouteGuardConfig<TUser>
  extends UseRouteGuardParams<TUser> {
  loadingLabel: string;
  errorLabel: string;
  renderForbidden: () => ReactNode;
}

export function createRouteGuard<TUser>(config: CreateRouteGuardConfig<TUser>) {
  return function GuardedRoute({
    children,
  }: {
    children: ReactNode;
  }) {
    return <RouteGuard<TUser> {...config} renderAuthorized={() => children} />;
  };
}
