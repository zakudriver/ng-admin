import { Injectable } from '@angular/core';
import { LoggerService } from '@app/core/services/logger.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimingService implements HttpInterceptor {

  constructor(private _loggerSer: LoggerService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const started = Date.now();
    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          const elapsed = Date.now() - started;
          this._loggerSer.log(`Request for ${req.urlWithParams} took ${elapsed} ms.`, '#ffe411', '#111');
        }
      })
    );
  }
}
