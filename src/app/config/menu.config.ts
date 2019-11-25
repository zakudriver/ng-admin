import { InjectionToken } from '@angular/core';

export const MENU_CONFIG = new InjectionToken<IMenu[]>('menu.config');

export const menuConfig: IMenu[] = [
  {
    key: '0',
    name: 'Article',
    icon: 'library_books',
    path: '/article'
  },
  {
    key: '1',
    name: 'Edidor',
    icon: 'edit',
    path: '/editor'
  },
  {
    key: '2',
    name: 'Message',
    icon: 'message',
    path: '/message'
  },
  {
    key: '3',
    name: 'Setting',
    icon: 'settings'
  },
  {
    key: '30',
    parentKey: '3',
    name: 'Front',
    icon: 'web',
    path: '/setting/front'
  },
  {
    key: '31',
    parentKey: '3',
    name: 'Admin',
    icon: 'apps',
    path: '/setting/admin'
  }
];

export const MENU_CONFIG_PROVIDER = {
  provide: MENU_CONFIG,
  useValue: menuConfig
};

export interface IMenu {
  key: string;
  parentKey?: string;
  name: string;
  path?: string;
  icon?: string;
}

export interface IMenuTree extends IMenu {
  children?: IMenuTree[];
}
