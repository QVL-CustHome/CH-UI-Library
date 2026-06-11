import EnvelopeOutline from "../../assets/icons/envelope-outline.svg?react";
import EnvelopeSolid from "../../assets/icons/envelope-solid.svg?react";
import EyeOutline from "../../assets/icons/eye-outline.svg?react";
import EyeSolid from "../../assets/icons/eye-solid.svg?react";
import EyeClosedOutline from "../../assets/icons/eye-closed-outline.svg?react";
import EyeClosedSolid from "../../assets/icons/eye-closed-solid.svg?react";
import LockOutline from "../../assets/icons/lock-outline.svg?react";
import LockSolid from "../../assets/icons/lock-solid.svg?react";
import PlusIcon from "../../assets/icons/plus.svg?react";
import PencilIcon from "../../assets/icons/pencil.svg?react";
import TrashIcon from "../../assets/icons/trash.svg?react";
import MenuIcon from "../../assets/icons/menu.svg?react";
import CloseIcon from "../../assets/icons/close.svg?react";
import MoonOutline from "../../assets/icons/moon-outline.svg?react";
import MoonSolid from "../../assets/icons/moon-solid.svg?react";
import SunOutline from "../../assets/icons/sun-outline.svg?react";
import SunSolid from "../../assets/icons/sun-solid.svg?react";
import UserOutline from "../../assets/icons/user-outline.svg?react";
import UserSolid from "../../assets/icons/user-solid.svg?react";
import HomeOutline from "../../assets/icons/home-outline.svg?react";
import HomeSolid from "../../assets/icons/home-solid.svg?react";
import AppsOutline from "../../assets/icons/apps-outline.svg?react";
import AppsSolid from "../../assets/icons/apps-solid.svg?react";
import SettingsOutline from "../../assets/icons/settings-outline.svg?react";
import SettingsSolid from "../../assets/icons/settings-solid.svg?react";
import LogoutOutline from "../../assets/icons/logout-outline.svg?react";
import LogoutSolid from "../../assets/icons/logout-solid.svg?react";
import ShieldOutline from "../../assets/icons/shield-outline.svg?react";
import ShieldSolid from "../../assets/icons/shield-solid.svg?react";
import CheckOutline from "../../assets/icons/check-outline.svg?react";
import CheckSolid from "../../assets/icons/check-solid.svg?react";
import CancelOutline from "../../assets/icons/cancel-outline.svg?react";
import CancelSolid from "../../assets/icons/cancel-solid.svg?react";
import SaveOutline from "../../assets/icons/save-outline.svg?react";
import SaveSolid from "../../assets/icons/save-solid.svg?react";

export const icons = {
  moon: { outline: MoonOutline, solid: MoonSolid },
  sun: { outline: SunOutline, solid: SunSolid },
  mail: { outline: EnvelopeOutline, solid: EnvelopeSolid },
  lock: { outline: LockOutline, solid: LockSolid },
  eye: { outline: EyeOutline, solid: EyeSolid },
  eyeOff: { outline: EyeClosedOutline, solid: EyeClosedSolid },
  user: { outline: UserOutline, solid: UserSolid },
  plus: { outline: PlusIcon, solid: PlusIcon },
  pencil: { outline: PencilIcon, solid: PencilIcon },
  trash: { outline: TrashIcon, solid: TrashIcon },
  menu: { outline: MenuIcon, solid: MenuIcon },
  close: { outline: CloseIcon, solid: CloseIcon },
  home: { outline: HomeOutline, solid: HomeSolid },
  apps: { outline: AppsOutline, solid: AppsSolid },
  settings: { outline: SettingsOutline, solid: SettingsSolid },
  logout: { outline: LogoutOutline, solid: LogoutSolid },
  shield: { outline: ShieldOutline, solid: ShieldSolid },
  check: { outline: CheckOutline, solid: CheckSolid },
  cancel: { outline: CancelOutline, solid: CancelSolid },
  save: { outline: SaveOutline, solid: SaveSolid },
} as const;

export type ChIconName = keyof typeof icons;
