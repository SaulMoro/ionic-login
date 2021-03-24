import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { selectAuthenticated } from '../+state/auth.selectors';
import { NoAuthGuard } from './no-auth.guard';

describe('NoAuthGuard', () => {
  it('should be created', () => {
    const guard = setup();

    expect(guard).toBeTruthy();
  });

  it('should can Activate if not authenticated', async (done) => {
    const guard = setup(false);

    guard.canActivate().subscribe((canActivate) => {
      expect(canActivate).toBe(true);
      done();
    });
  });

  it('should cant Activate if is authenticated', async (done) => {
    const guard = setup(true);

    guard.canActivate().subscribe((canActivate) => {
      expect(canActivate).toBe(false);
      done();
    });
  });
});

export const setup = (authenticated = false): NoAuthGuard => {
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

  return TestBed.inject(NoAuthGuard);
};
