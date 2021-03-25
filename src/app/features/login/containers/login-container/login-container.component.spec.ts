import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { render, screen } from '@testing-library/angular';

import { selectError, selectLoading } from '@app/core/auth/+state/auth.selectors';
import { SharedModule } from '@app/shared/shared.module';
import { LoginContainerComponent } from './login-container.component';

describe('LoginContainerComponent', () => {
  it('should create with Mock Store', async () => {
    await setup();

    expect(screen.getByRole('button', { name: /Acceder/i })).toBeTruthy();
  });
});

export const setup = async (loading = false, error: string | null = null) => {
  const container = await render(LoginContainerComponent, {
    imports: [SharedModule],
    providers: [
      provideMockStore({
        selectors: [
          {
            selector: selectLoading,
            value: loading,
          },
          {
            selector: selectError,
            value: error,
          },
        ],
      }),
    ],
  });

  const store = TestBed.inject(MockStore);
  store.dispatch = jasmine.createSpy();

  return { container, store };
};
