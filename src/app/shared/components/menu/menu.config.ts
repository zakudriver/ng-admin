import { InjectionToken } from '@angular/core';

export const MENU_CONFIG = new InjectionToken<MenuConfig>('menu.config');

export const menuConfig = {
  menuPrefix: 'zyhh-menu'
};
export type MenuConfig = typeof menuConfig;

export const MENU_COMPONENT_CONFIG_PROVIDER = {
  provide: MENU_CONFIG,
  useValue: menuConfig
};
