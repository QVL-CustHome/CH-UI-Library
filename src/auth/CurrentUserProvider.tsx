import type { ReactNode } from "react";
import { CurrentUserContext } from "./CurrentUserContext";

export interface ChCurrentUserProviderProps<TUser> {
  value: TUser;
  children: ReactNode;
}

export function CurrentUserProvider<TUser>({
  value,
  children,
}: ChCurrentUserProviderProps<TUser>) {
  return (
    <CurrentUserContext.Provider value={value}>
      {children}
    </CurrentUserContext.Provider>
  );
}
