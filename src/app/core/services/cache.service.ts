import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  constructor() {}

  private _parseValue(value: string | null) {
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

  setSession(key: string, value: string) {
    sessionStorage.setItem(key, value);
  }

  getSession(key: string) {
    const v = sessionStorage.getItem(key);
    return this._parseValue(v);
  }

  rmSession(key: string) {
    sessionStorage.removeItem(key);
  }

  setLocal(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  getLocal(key: string): string | null {
    const v = localStorage.getItem(key);
    return this._parseValue(v);
  }

  rmLocal(key: string) {
    localStorage.removeItem(key);
  }
}
