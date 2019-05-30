import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { LoggerService } from './logger.service';
import { map, tap, filter, catchError } from 'rxjs/operators';
import { Observable, throwError, of } from 'rxjs';

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
  constructor(private _http: HttpClient, private _loggerSer: LoggerService) {}

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
  ): Observable<T> {
    return this._http.request<IResponse<T>>(method, url, option).pipe(
      map(d => {
        if (d.code !== 0) {
          throwError(d.msg);
        }
        return d;
      }),
      // filter(d => d.code === 0),
      map(d => d.data),
      tap(d => {
        this._loggerSer.responseLog(d, func);
      }),
      catchError(err => {
        // TODO: message框
        console.log(err);
        if (def) {
          return of(def);
        }
        return of(err);
      }),
    );
  }

  get<T>(
    func: string,
    url: string,
    params?: Params,
    opt?: IRequestOpt,
  ): Observable<IResponse<T>> {
    const option = this._handleOpt(params, opt);
    return this._handleRequest(func, 'get', url, option);
  }

  post<T>(
    func: string,
    url: string,
    params?: Params,
    opt?: IRequestOpt,
  ): Observable<IResponse<T>> {
    const option = this._handleOpt(params, opt);
    return this._handleRequest(func, 'post', url, option);
  }

  put<T>(
    func: string,
    url: string,
    params?: Params,
    opt?: IRequestOpt,
  ): Observable<IResponse<T>> {
    const option = this._handleOpt(params, opt);
    return this._handleRequest(func, 'put', url, option);
  }

  delete<T>(
    func: string,
    url: string,
    params?: Params,
    opt?: IRequestOpt,
  ): Observable<IResponse<T>> {
    const option = this._handleOpt(params, opt);
    return this._handleRequest(func, 'delete', url, option);
  }
}
