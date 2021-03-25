import { ActionReducer, createReducer, on } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';

import { RootState } from '@app/core/core.state';
import * as AuthActions from './auth.actions';
import { User } from '../models';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState {
  user: User | null;
  token: string | null;
  remember: boolean;
  loading: boolean;
  error: string | null;
}

export const initialState: AuthState = {
  user: null,
  token: null,
  remember: false,
  loading: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.enterLoginPage, (state) => ({
    ...state,
    loading: false,
    error: null,
  })),
  on(AuthActions.login, (state, { credentials }) => ({
    ...state,
    remember: credentials.remember,
    token: null,
    loading: true,
    error: null,
  })),
  on(AuthActions.logout, AuthActions.unauthorized, () => initialState),

  on(AuthActions.loginSuccess, (state, { user, token }) => ({
    ...state,
    user: { ...state.user, ...user },
    token,
    loading: false,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
);

export const localstorageAuthMetaReducer = (reducer: ActionReducer<RootState>): ActionReducer<RootState> =>
  localStorageSync({
    keys: [AUTH_FEATURE_KEY],
    rehydrate: true,
    removeOnUndefined: true,
    storageKeySerializer: (key) => `IL_${key}`,
    // Only persists if "remember me" in login
    syncCondition: (state: RootState) => state.auth.remember,
  })(reducer);
