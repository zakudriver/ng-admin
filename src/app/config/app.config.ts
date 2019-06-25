import { InjectionToken } from '@angular/core';
import { environment } from '@src/environments/environment';

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export const appConfig = {
  api: 'http://127.0.0.1:8999',
  // api: 'http://api.zyhua.cn',
  router: [
    {
      name: 'Article',
      path: '/article'
    },
    {
      name: 'Settings',
      children: [
        {
          name: 'Front',
          path: '/settings/front'
        },
        {
          name: 'Admin',
          path: '/settings/admin'
        }
      ]
    }
  ]
};
export type AppConfig = typeof appConfig;

export const APP_CONFIG_PROVIDER = {
  provide: APP_CONFIG,
  useValue: appConfig
};
