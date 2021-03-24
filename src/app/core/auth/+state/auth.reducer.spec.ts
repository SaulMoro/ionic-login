import { authReducer, initialState } from './auth.reducer';
import * as AuthActions from './auth.actions';
import { USERS } from '../services/auth.service';

describe('Auth Reducer', () => {
  it('should return the previous state if unknown action', () => {
    const action = {} as never;
    const state = authReducer(initialState, action);

    expect(state).toBe(initialState);
  });

  it('should error and loading reset on enter login page', () => {
    const action = AuthActions.enterLoginPage();
    const state = authReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
  });

  it('should initial state and loading on login', () => {
    const credentials = { email: 'test@test.com', password: 'test', remember: true };
    const action = AuthActions.login({ credentials });
    const state = authReducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBe(initialState.error);
    expect(state.token).toBe(initialState.token);
    expect(state.user).toBe(initialState.user);
    expect(state.remember).toBe(credentials.remember);
  });

  it('should initial state on logout', () => {
    const action = AuthActions.logout();
    const state = authReducer(initialState, action);

    expect(state).toBe(initialState);
  });

  it('should initial state on unauthorized', () => {
    const action = AuthActions.unauthorized();
    const state = authReducer(initialState, action);

    expect(state).toBe(initialState);
  });

  it('should set token and loading false on login success', () => {
    const user = USERS['test@test.com'];
    const token = 'abc===';
    const action = AuthActions.loginSuccess({ user, token });
    const state = authReducer({ ...initialState, loading: true }, action);

    expect(state.loading).toBe(false);
    expect(state.token).toBe(token);
  });

  it('should set error and loading false on login failure', () => {
    const error = 'error test';
    const action = AuthActions.loginFailure({ error });
    const state = authReducer({ ...initialState, loading: true }, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
  });
});
