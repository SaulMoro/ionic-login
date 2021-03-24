import { AuthState, AUTH_FEATURE_KEY, initialState } from './auth.reducer';
import * as AuthSelectors from './auth.selectors';
import { USERS } from '../services/auth.service';

describe('Auth Selectors', () => {
  it('should select Auth State', () => {
    const state = setup();

    expect(AuthSelectors.selectAuthState(state)).toEqual(initialState);
  });

  it('should select Loading', () => {
    const stateLoading = setup({ loading: true });
    const stateNotLoading = setup({ loading: false });

    expect(AuthSelectors.selectLoading(stateLoading)).toBe(true);
    expect(AuthSelectors.selectLoading(stateNotLoading)).toBe(false);
  });

  it('should select Error', () => {
    const state = setup();
    const stateError = setup({ error: 'test' });

    expect(AuthSelectors.selectError(state)).toBe(initialState.error);
    expect(AuthSelectors.selectError(stateError)).toBe('test');
  });

  it('should select User', () => {
    const user = USERS['test@test.com'];
    const state = setup();
    const stateUser = setup({ user });

    expect(AuthSelectors.selectUser(state)).toBe(initialState.user);
    expect(AuthSelectors.selectUser(stateUser)).toBe(user);
  });

  it('should select Role', () => {
    const client = USERS['test@test.com'];
    const vip = USERS['vip@vip.com'];
    const stateNoRole = setup();
    const stateClient = setup({ user: client });
    const stateVip = setup({ user: vip });

    expect(AuthSelectors.selectRoles(stateNoRole)).toEqual(['user']);
    expect(AuthSelectors.selectRoles(stateClient)).toEqual(['client']);
    expect(AuthSelectors.selectRoles(stateVip)).toEqual(['vip', 'client']);
  });

  it('should select Is Vip', () => {
    const client = USERS['test@test.com'];
    const vip = USERS['vip@vip.com'];
    const stateClient = setup({ user: client });
    const stateVip = setup({ user: vip });

    expect(AuthSelectors.selectIsVIP(stateClient)).toBe(false);
    expect(AuthSelectors.selectIsVIP(stateVip)).toBe(true);
  });

  it('should select Remember', () => {
    const stateRemember = setup({ remember: true });
    const stateNotRemember = setup({ remember: false });

    expect(AuthSelectors.selectRemember(stateRemember)).toBe(true);
    expect(AuthSelectors.selectRemember(stateNotRemember)).toBe(false);
  });

  it('should select Token', () => {
    const token = 'test';
    const state = setup();
    const stateTokenized = setup({ token });

    expect(AuthSelectors.selectToken(state)).toBe(initialState.token);
    expect(AuthSelectors.selectToken(stateTokenized)).toBe(token);
  });

  it('should select Authenticated', () => {
    const token = 'test';
    const state = setup();
    const stateTokenized = setup({ token });

    expect(AuthSelectors.selectAuthenticated(state)).toBe(false);
    expect(AuthSelectors.selectAuthenticated(stateTokenized)).toBe(true);
  });
});

const setup = (state?: Partial<AuthState>): { [AUTH_FEATURE_KEY]: AuthState } => {
  return {
    [AUTH_FEATURE_KEY]: { ...initialState, ...state },
  };
};
