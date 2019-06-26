import { IMenu } from '@app/layout/sidebar/menu/interface';
import { InjectionToken } from '@angular/core';

export const MENU_CONFIG = new InjectionToken<MenuConfig>('menu.config');

export const menuConfig: IMenu[] = [
  {
    key: 1,
    name: 'Article',
    icon: ''
  },
  {
    key: 11,
    parentKey: 1,
    name: 'Article',
    path: '/article',
    icon: ''
  },
  {
    key: 12,
    parentKey: 1,
    name: 'Setting',
    path: '/setting',
    icon: ''
  }
];

export type MenuConfig = typeof menuConfig;

export const MENU_CONFIG_PROVIDER = {
  provide: MENU_CONFIG,
  useValue: menuConfig
};
