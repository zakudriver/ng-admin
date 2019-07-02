import { TestBed, inject, async } from '@angular/core/testing';
import { CacheService } from './cache.service';

describe('CacheService', () => {
  let ser: CacheService;
  beforeEach(() => {
    ser = new CacheService();
  });

  const testKey = 'testKey';
  const testValue = {
    name: 'zyhua'
  };

  it('#setLocal', () => {
    ser.setLocal(testKey, testValue);
  });

  it('#getLocal', () => {
    const r = ser.getLocal(testKey);
    expect(JSON.stringify(r)).toEqual(JSON.stringify(testValue));
  });

  it('#rmLocal', () => {
    ser.rmLocal(testKey);
    expect(ser.getLocal(testKey)).toBeNull();
  });

  it('#setSession', () => {
    ser.setSession(testKey, testValue);
  });

  it('#getSession', () => {
    const r = ser.getSession(testKey);
    expect(JSON.stringify(r)).toEqual(JSON.stringify(testValue));
  });

  it('#rmSession', () => {
    ser.rmSession(testKey);
    expect(ser.getSession(testKey)).toBeNull();
  });
});
