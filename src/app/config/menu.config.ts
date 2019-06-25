import { IMenu } from '@app/layout/sidebar/menu/interface';

export const menu: IMenu[] = [
  {
    key: 1,
    name: 'Article',
    // path: '/article',
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
