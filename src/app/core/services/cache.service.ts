import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  constructor() {}

  private _parseFromString(value: string | null) {
    if (value) {
      try {
        const r = JSON.parse(value);
        if (typeof r === 'object') {
          return r;
        } else if (typeof r === 'number') {
          return r;
        }
      } catch (e) {
        return value;
      }
    } else {
      return null;
    }
  }

  private _parseToString(value: any): string {
    if (typeof value === 'string') {
      return value;
    }

    return JSON.stringify(value);
  }

  setSession(key: string, value: any) {
    sessionStorage.setItem(key, this._parseToString(value));
  }

  getSession(key: string) {
    const v = sessionStorage.getItem(key);
    return this._parseFromString(v);
  }

  rmSession(key: string) {
    sessionStorage.removeItem(key);
  }

  setLocal(key: string, value: any) {
    localStorage.setItem(key, this._parseToString(value));
  }

  getLocal(key: string): string | null {
    const v = localStorage.getItem(key);
    return this._parseFromString(v);
  }

  rmLocal(key: string) {
    localStorage.removeItem(key);
  }
}
