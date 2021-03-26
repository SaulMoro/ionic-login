import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, exhaustMap, switchMap, tap } from 'rxjs/operators';

import * as AuthActions from './auth.actions';
import { AUTH_FEATURE_KEY } from './auth.reducer';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ credentials }) =>
        this.authService.login(credentials).pipe(
          map(({ user, token }) => AuthActions.loginSuccess({ user, token })),
          catchError((error: unknown) => of(AuthActions.loginFailure({ error: error as string }))),
        ),
      ),
    ),
  );

  redirectOnLoginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(() => this.router.navigate(['/'])),
      ),
    { dispatch: false },
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        exhaustMap(() => this.authService.logout().pipe(tap(() => localStorage.removeItem(`IL_${AUTH_FEATURE_KEY}`)))),
      ),
    { dispatch: false },
  );

  redirectToLoginOnLogout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout, AuthActions.unauthorized),
        tap(() => this.router.navigate(['/login'])),
      ),
    { dispatch: false },
  );

  constructor(private actions$: Actions, private authService: AuthService, private router: Router) {}
}
