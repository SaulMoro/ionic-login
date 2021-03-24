import { USERS } from '../services/auth.service';
import { enterLoginPage, login, logout, unauthorized, loginSuccess, loginFailure } from './auth.actions';

describe('Auth Actions', () => {
  it('should create Enter Login Page action', () => {
    const action = enterLoginPage();

    expect(action.type).toEqual(enterLoginPage.type);
  });

  it('should create Login action', () => {
    const credentials = { email: 'test@test.com', password: 'test', remember: true };
    const action = login({ credentials });

    expect(action.type).toEqual(login.type);
    expect(action.credentials.email).toEqual(credentials.email);
    expect(action.credentials.password).toEqual(credentials.password);
  });

  it('should create Logout action', () => {
    const action = logout();

    expect(action.type).toEqual(logout.type);
  });

  it('should create Unauthorized action', () => {
    const action = unauthorized();

    expect(action.type).toEqual(action.type);
  });

  it('should create Login Success action', () => {
    const user = USERS['test@test.com'];
    const token = 'abc==';
    const action = loginSuccess({ token, user });

    expect(action.type).toEqual(loginSuccess.type);
    expect(action.user).toEqual(user);
    expect(action.token).toEqual(token);
  });

  it('should create Login Failure action', () => {
    const error = 'Bad credentials';
    const action = loginFailure({ error });

    expect(action.type).toEqual(loginFailure.type);
    expect(action.error).toEqual(error);
  });
});
