import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { selectAuthenticated } from '../+state/auth.selectors';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  it('should be created', () => {
    const guard = setup();

    expect(guard).toBeTruthy();
  });

  it('should can Activate if is authenticated', async (done) => {
    const guard = setup(true);

    guard.canActivate().subscribe((canActivate) => {
      expect(canActivate).toBe(true);
      done();
    });
  });

  it('should cant Activate if not authenticated', async (done) => {
    const guard = setup(false);

    guard.canActivate().subscribe((canActivate) => {
      expect(canActivate).toBe(false);
      done();
    });
  });
});

export const setup = (authenticated = false): AuthGuard => {
  TestBed.configureTestingModule({
    providers: [
      provideMockStore({
        selectors: [
          {
            selector: selectAuthenticated,
            value: authenticated,
          },
        ],
      }),
    ],
  });

  return TestBed.inject(AuthGuard);
};
