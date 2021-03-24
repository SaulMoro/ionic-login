import { createAction, props } from '@ngrx/store';
import { Credentials, User } from '../models';

export const enterLoginPage = createAction('[Login Page] Enter Login Page');
export const login = createAction('[Login Page] Login', props<{ credentials: Credentials }>());

export const logout = createAction('[Home Page] Logout');

export const unauthorized = createAction('[Auth Interceptor] Unauthorized');

/*
 API Actions
 */
export const loginSuccess = createAction('[Auth API] Login Success', props<{ user: User; token: string }>());
export const loginFailure = createAction('[Auth API] Login Failure', props<{ error: string }>());
