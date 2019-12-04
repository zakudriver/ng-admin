import { InjectionToken } from '@angular/core';
import { environment } from '@src/environments/environment';

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export type AppConfig = typeof environment;

export const APP_CONFIG_PROVIDER = {
  provide: APP_CONFIG,
  useValue: environment
};
