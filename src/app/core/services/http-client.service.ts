import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { LoggerService } from './logger.service';
import { tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { MethodAfter, MethodDecoratorFunc } from '../utils/decorators/method';

interface IRequestOpt {
  body?: any;
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  observe?: 'body';
  params?:
    | HttpParams
    | {
        [param: string]: string | string[];
      };
  responseType?: 'json';
  reportProgress?: boolean;
  withCredentials?: boolean;
}

type Params =
  | HttpParams
  | {
      [param: string]: string | string[];
    }
  | null;

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  static MethodAfterLog = MethodAfter((target, propertyKey, descriptor) => {
    const text = typeof propertyKey === 'string' ? propertyKey : propertyKey.toString();
    console.log(`%c function: ${text}`, `color:#fff;background:#f44336`);
  });

  constructor(private _http: HttpClient, private _loggerSer: LoggerService, private _snackBar: MatSnackBar) {}

  private _makeOpt(method: string, params: Params | undefined, opt: IRequestOpt | undefined): IRequestOpt {
    const option = {};
    if (params) {
      if (method === 'get') {
        Object.assign(option, {
          params
        });
      } else {
        Object.assign(option, {
          body: params
        });
      }
    }

    if (opt) {
      Object.assign(option, opt);
    }

    return option;
  }

  private _handleRequest<T>(method: string, url: string, option: IRequestOpt, def?: T): Observable<IResponse<T>> {
    return this._http.request<IResponse<T>>(method, url, option).pipe(
      tap(r => {
        this._loggerSer.responseLog(r);
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.error.msg) {
          this._snackBar.open(err.error.msg);
        }
        this._loggerSer.error(err.error);

        return of({
          msg: '',
          data: def || null,
          error: err.error.msg || 'error'
        } as IResponse);
      })
    );
  }

  get<T>(url: string, params?: Params, opt?: IRequestOpt, def?: T): Observable<IResponse<T>> {
    const option = this._makeOpt('get', params, opt);
    return this._handleRequest<T>('get', url, option, def);
  }

  post<T>(url: string, params?: Params, opt?: IRequestOpt, def?: T): Observable<IResponse<T>> {
    const option = this._makeOpt('post', params, opt);
    return this._handleRequest<T>('post', url, option, def);
  }

  put<T>(url: string, params?: Params, opt?: IRequestOpt, def?: T): Observable<IResponse<T>> {
    const option = this._makeOpt('put', params, opt);
    return this._handleRequest<T>('put', url, option, def);
  }

  delete<T>(url: string, params?: Params, opt?: IRequestOpt, def?: T): Observable<IResponse<T>> {
    const option = this._makeOpt('delete', params, opt);
    return this._handleRequest<T>('delete', url, option, def);
  }
}
