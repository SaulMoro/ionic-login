import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { render, screen } from '@testing-library/angular';

import { selectError, selectLoading } from '@app/core/auth/+state/auth.selectors';
import { SharedModule } from '@app/shared/shared.module';
import { LoginContainerComponent } from './login-container.component';
import { LoginButtonComponent } from '../../components/login-button/login-button.component';
import { LoginInputComponent } from '../../components/login-input/login-input.component';
import { LoginToggleComponent } from '../../components/login-toggle/login-toggle.component';

describe('LoginContainerComponent', () => {
  it('should create with Mock Store', async () => {
    await setup();

    const button = screen.getByRole('button', { name: /Acceder/i });

    expect(button).toBeTruthy();
  });
});

export const setup = async (loading = false, error: string | null = null) => {
  const container = await render(LoginContainerComponent, {
    imports: [SharedModule],
    declarations: [LoginButtonComponent, LoginInputComponent, LoginToggleComponent],
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
