import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { concatMap, delay, retryWhen } from 'rxjs/operators';

export const retryCount = 5;
export const retryWaitMilliSeconds = 1000;

@Injectable()
export class MonitorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      retryWhen(error => 
        error.pipe(
          concatMap((error, count) => count <= retryCount ? of(error) : throwError(error)),
          delay(retryWaitMilliSeconds)
        )
      )
    );
  }
}
