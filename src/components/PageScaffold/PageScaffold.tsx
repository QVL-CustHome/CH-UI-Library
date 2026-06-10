import type { ReactNode } from "react";
import { Navbar, type ChNavbarItem } from "../Navbar";

export interface ChPageScaffoldProps {
  title?: string;
  items: ChNavbarItem[];
  activeHref?: string;
  onNavigate?: (href: string) => void;
  userName?: string;
  onLogout?: () => void;
  children: ReactNode;
}

export function PageScaffold({
  title,
  items,
  activeHref,
  onNavigate,
  userName,
  onLogout,
  children,
}: ChPageScaffoldProps) {
  return (
    <Navbar
      title={title}
      items={items}
      activeHref={activeHref}
      onNavigate={onNavigate}
      userName={userName}
      onLogout={onLogout}
    >
      {children}
    </Navbar>
  );
}
