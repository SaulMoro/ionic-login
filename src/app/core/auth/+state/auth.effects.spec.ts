import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';

import * as AuthActions from './auth.actions';
import { AuthEffects } from './auth.effects';
import { AuthService, USERS } from '../services/auth.service';
import { Credentials } from '../models';

describe('AuthEffects', () => {
  let effects: AuthEffects;
  let actions$: Observable<any>;
  let authService: any;
  let router: any;

  beforeEach(() => {
    router = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        {
          provide: AuthService,
          useValue: { login: jasmine.createSpy('login'), logout: jasmine.createSpy('logout') },
        },
        provideMockActions(() => actions$),
        {
          provide: Router,
          useValue: router,
        },
      ],
    });

    effects = TestBed.inject(AuthEffects);
    actions$ = TestBed.inject(Actions);
    authService = TestBed.inject(AuthService);
  });

  describe('login$', () => {
    it('should return loginSuccess with user if login ok', () => {
      const credentials: Credentials = { email: 'test@test.com', password: 'test', remember: true };
      const user = USERS['test@test.com'];
      const action = AuthActions.login({ credentials });
      const completion = AuthActions.loginSuccess({ user, token: 'abc==' });

      actions$ = hot('-a---', { a: action });
      const response = cold('-a|', { a: { user, token: 'abc==' } });
      const expected = cold('--b', { b: completion });
      authService.login = jasmine.createSpy().and.returnValue(response);

      expect(effects.login$).toBeObservable(expected);
    });

    it('should return a loginFailure if login fail', () => {
      const credentials: Credentials = { email: 'fail@fail.com', password: '', remember: true };
      const error = 'Bad Credentials';
      const action = AuthActions.login({ credentials });
      const completion = AuthActions.loginFailure({ error });

      actions$ = hot('-a---', { a: action });
      const response = cold('-#', {}, error);
      const expected = cold('--b', { b: completion });
      authService.login = jasmine.createSpy().and.returnValue(response);

      expect(effects.login$).toBeObservable(expected);
    });
  });

  describe('redirectOnLoginSuccess$', () => {
    it('should dispatch a RouterNavigation action', (done) => {
      const user = USERS['test@test.com'];
      const action = AuthActions.loginSuccess({ user, token: 'abc==' });

      actions$ = of(action);

      effects.redirectOnLoginSuccess$.subscribe(() => {
        expect(router.navigate).toHaveBeenCalledWith(['/']);
        done();
      }, fail);
    });
  });

  describe('logout$', () => {
    it('should call logout when logout is dispatched', (done) => {
      const action = AuthActions.logout();

      actions$ = of(action);
      authService.logout = jasmine.createSpy().and.returnValue(of(true));

      effects.logout$.subscribe(() => {
        expect(authService.logout).toHaveBeenCalledTimes(1);
        done();
      }, fail);
    });
  });

  describe('redirectToLoginOnLogout$', () => {
    it('should dispatch a RouterNavigation action when logout is dispatched', (done) => {
      const action = AuthActions.logout();

      actions$ = of(action);

      effects.redirectToLoginOnLogout$.subscribe(() => {
        expect(router.navigate).toHaveBeenCalledWith(['/login']);
        done();
      }, fail);
    });

    it('should dispatch a RouterNavigation action when unauthorized is dispatched', (done) => {
      const action = AuthActions.unauthorized();

      actions$ = of(action);

      effects.redirectToLoginOnLogout$.subscribe(() => {
        expect(router.navigate).toHaveBeenCalledWith(['/login']);
        done();
      }, fail);
    });
  });
});
