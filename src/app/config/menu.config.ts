import { InjectionToken } from '@angular/core';

export const MENU_CONFIG = new InjectionToken<IMenu[]>('menu.config');

export const menuConfig: IMenu[] = [
  {
    key: '1',
    name: 'Article',
    icon: 'menu'
  },
  {
    key: '11',
    parentKey: '1',
    name: 'Article',
    path: '/article',
    icon: 'menu'
  },
  {
    key: '12',
    parentKey: '1',
    name: 'Setting',
    path: '/setting',
    icon: ''
  },
  {
    key: '2',
    name: 'Article',
    icon: ''
  },
  {
    key: '21',
    parentKey: '2',
    name: 'Article',
    path: '/article',
    icon: ''
  },
  {
    key: '22',
    parentKey: '2',
    name: 'Setting',
    path: '/setting',
    icon: ''
  },
  {
    key: '3',
    name: 'Article',
    icon: ''
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
