import { InjectionToken } from '@angular/core';

export const MENU_CONFIG = new InjectionToken<MenuConfig>('menu.config');

export const menuConfig = {
  menuPrefix: 'zyhh-menu',
  submenuPrefix: 'zyhh-submenu'
};
export type MenuConfig = typeof menuConfig;

export const MENU_CONFIG_PROVIDE = {
  provide: MENU_CONFIG,
  useValue: menuConfig
};
