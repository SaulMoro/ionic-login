import { TestBed } from '@angular/core/testing';
import { AuthService, USERS } from './auth.service';
import { Credentials } from '../models';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login fail if bad request', async (done) => {
    const req: Credentials = { email: 'noexists@noexists.com', password: 'noexists', remember: false };

    service.login(req).subscribe(
      () => fail(),
      (error: unknown) => {
        expect(error).toBeTruthy();
        done();
      },
    );
  });

  it('should login with test client', async (done) => {
    const userData = USERS['test@test.com'];
    const req: Credentials = { email: userData.email, password: 'test', remember: false };

    service.login(req).subscribe(({ user, token }) => {
      expect(user).toEqual(userData);
      expect(token).toBeTruthy();
      done();
    }, fail);
  });

  it('should login with vip client', async (done) => {
    const userData = USERS['vip@vip.com'];
    const req: Credentials = { email: userData.email, password: 'vip', remember: false };

    service.login(req).subscribe(({ user, token }) => {
      expect(user).toEqual(userData);
      expect(token).toBeTruthy();
      done();
    }, fail);
  });

  it('should logout', async (done) => {
    service.logout().subscribe((res) => {
      expect(res).toBeTruthy();
      done();
    }, fail);
  });
});
