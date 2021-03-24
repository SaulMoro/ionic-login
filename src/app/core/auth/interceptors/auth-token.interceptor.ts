import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';

import { selectToken } from '../+state/auth.selectors';
import { unauthorized } from '../+state/auth.actions';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  constructor(private store: Store) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.store.select(selectToken).pipe(
      take(1),
      switchMap((token) => {
        const authReq = token ? request.clone({ setHeaders: { authorization: `Bearer ${token}` } }) : request;

        return next.handle(authReq).pipe(
          catchError((err: unknown) => {
            if ((err as HttpErrorResponse).status === 401 || (err as HttpErrorResponse).status === 403) {
              this.store.dispatch(unauthorized());
            }
            return throwError(err);
          }),
        );
      }),
    );
  }
}
