import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { LoggerService } from './logger.service';
import { map, tap, catchError, filter } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material';

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
  providedIn: 'root',
})
export class HttpClientService {
  constructor(private _http: HttpClient, private _loggerSer: LoggerService, private _snackBar: MatSnackBar) {
  }

  private _handleOpt(params: Params, opt: IRequestOpt | null): IRequestOpt {
    const option = {};
    if (params) {
      Object.assign(option, {
        params,
      });
    }
    if (opt) {
      Object.assign(option, opt);
    }

    return option;
  }

  private _handleRequest<T>(
    func: string,
    method: string,
    url: string,
    option: IRequestOpt,
    def?: T,
  ): Observable<T | {}> {
    return this._http.request<IResponse<T>>(method, url, option).pipe(
      tap(v => {
        if (v.code !== 0) {
          throw new Error(v.msg);
        }
        this._loggerSer.responseLog(v, func);
      }),
      map(v => v.data),
      catchError((err: Error) => {
        this._snackBar.open(err.message);
        this._loggerSer.error(err.message);
        if (def) {
          return of(def);
        }
        return of();
      })
    );
  }

  get<T>(
    func: string,
    url: string,
    params?: Params,
    opt?: IRequestOpt,
  ): Observable<T | {}> {
    const option = this._handleOpt(params, opt);
    return this._handleRequest<T>(func, 'get', url, option);
  }

  post<T>(
    func: string,
    url: string,
    params?: Params,
    opt?: IRequestOpt,
  ): Observable<T | {}> {
    const option = this._handleOpt(params, opt);
    return this._handleRequest<T>(func, 'post', url, option);
  }

  put<T>(
    func: string,
    url: string,
    params?: Params,
    opt?: IRequestOpt,
  ): Observable<T | {}> {
    const option = this._handleOpt(params, opt);
    return this._handleRequest<T>(func, 'put', url, option);
  }

  delete<T>(
    func: string,
    url: string,
    params?: Params,
    opt?: IRequestOpt,
  ): Observable<T | {}> {
    const option = this._handleOpt(params, opt);
    return this._handleRequest<T>(func, 'delete', url, option);
  }
}
