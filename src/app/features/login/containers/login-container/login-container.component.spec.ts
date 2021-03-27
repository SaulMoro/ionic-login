import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { render, screen, fireEvent, RenderResult } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { of } from 'rxjs';

import { AuthActions, AuthEffects, AuthSelectors } from '@app/core/auth';
import { reducers } from '@app/core/core.state';
import { AlertComponent } from '@app/shared/components/alert/alert.component';
import { waitFor } from '@app/test-helpers';
import { LoginContainerComponent } from './login-container.component';
import { LoginButtonComponent } from '../../components/login-button/login-button.component';
import { LoginInputComponent } from '../../components/login-input/login-input.component';
import { LoginToggleComponent } from '../../components/login-toggle/login-toggle.component';

const credentials = { email: 'test@test.com', password: 'testpassword' };

describe('LoginContainerComponent', () => {
  let component: RenderResult<LoginContainerComponent>;
  let store: MockStore;

  beforeEach(async () => {
    component = await render(LoginContainerComponent, {
      declarations: [LoginButtonComponent, LoginInputComponent, LoginToggleComponent, AlertComponent],
      providers: [
        provideMockStore({
          selectors: [
            { selector: AuthSelectors.selectLoading, value: false },
            { selector: AuthSelectors.selectError, value: null },
          ],
        }),
      ],
    });

    store = TestBed.inject(MockStore);
    store.dispatch = jasmine.createSpy();
  });

  it('should disabled/enabled button by loading', () => {
    const button = screen.getByRole('button', { name: /Acceder/i });
    expect(button).toBeEnabled();

    component.rerender({ loading$: of(true) });
    expect(button).toBeDisabled();
  });

  it('should validations flow works', async () => {
    const email = screen.getByPlaceholderText(/email/i);
    const password = screen.getByPlaceholderText(/contraseña/i);
    const button = screen.getByRole('button', { name: /acceder/i });
    const toggle = screen.getByRole('checkbox');

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(email).toHaveValue('');
    expect(password).toHaveValue('');
    expect(toggle).not.toBeChecked();
    expect(button).not.toBeDisabled();

    userEvent.type(email, 'Test');
    fireEvent.blur(email); // Mark as touched
    userEvent.type(password, 'pass');
    fireEvent.blur(password); // Mark as touched

    await waitFor(() => expect(screen.queryByPlaceholderText(/email/i)).toHaveValue('Test'), { timeout: 1000 });
    await waitFor(() => expect(password).toHaveValue('pass'), { timeout: 1000 });

    const validations = await screen.findByRole('alert');
    expect(validations).toContainElement(screen.getByText(/La dirección de correo electrónico no es válida/i));
    expect(validations).toContainElement(screen.getByText(/el campo/i));

    fireEvent.change(email, { target: { value: '' } });
    userEvent.type(email, 'test@test.com');
    fireEvent.change(password, { target: { value: '' } });
    userEvent.type(password, 'testpassword');
    userEvent.click(button);

    expect(validations).not.toBeInTheDocument();
  });

  it('should login flow works with bad and correct credentials', () => {
    const email = screen.getByPlaceholderText(/email/i);
    const password = screen.getByPlaceholderText(/contraseña/i);
    const button = screen.getByRole('button', { name: /acceder/i });
    const toggle = screen.getByRole('checkbox');

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(email).toHaveValue('');
    expect(password).toHaveValue('');
    expect(toggle).not.toBeChecked();
    expect(button).not.toBeDisabled();

    userEvent.type(email, credentials.email);
    fireEvent.blur(email); // Mark as touched
    userEvent.type(password, credentials.password);
    fireEvent.blur(password); // Mark as touched

    expect(email).toHaveValue(credentials.email);
    expect(email).toBeValid();
    expect(password).toHaveValue(credentials.password);
    expect(password).toBeValid();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();

    userEvent.click(button);
    expect(store.dispatch).toHaveBeenCalledWith(
      AuthActions.login({ credentials: { ...credentials, remember: false } }),
    );

    userEvent.click(toggle);
    expect(toggle).toBeChecked();

    userEvent.click(button);
    expect(store.dispatch).toHaveBeenCalledWith(AuthActions.login({ credentials: { ...credentials, remember: true } }));
  });
});

describe('LoginContainerComponent Integration', () => {
  let component: RenderResult<LoginContainerComponent>;
  const mockRouter = {
    navigate: jasmine.createSpy('navigate').and.callThrough(),
  };

  beforeEach(async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    component = await render(LoginContainerComponent, {
      declarations: [LoginButtonComponent, LoginInputComponent, LoginToggleComponent, AlertComponent],
      imports: [StoreModule.forRoot(reducers), EffectsModule.forRoot([AuthEffects])],
      providers: [AuthEffects, { provide: Router, useValue: mockRouter }],
    });
  });

  it('should login flow works with bad and correct credentials with store integration', async () => {
    const email = screen.getByPlaceholderText(/email/i);
    const password = screen.getByPlaceholderText(/contraseña/i);
    const button = screen.getByRole('button', { name: /acceder/i });
    const toggle = screen.getByRole('checkbox');

    expect(email).toHaveValue('');
    expect(password).toHaveValue('');
    expect(toggle).not.toBeChecked();
    expect(button).not.toBeDisabled();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();

    userEvent.type(email, 'prueba@prueba.com');
    fireEvent.blur(email); // Mark as touched
    userEvent.type(password, 'pruebapassword');
    fireEvent.blur(password); // Mark as touched
    userEvent.click(button);

    const error = await screen.findByRole('alert');
    expect(error).toContainElement(screen.getByText(/Las credenciales introducidas no son correctas/i));

    fireEvent.change(email, { target: { value: '' } });
    userEvent.type(email, credentials.email);
    fireEvent.change(password, { target: { value: '' } });
    userEvent.type(password, credentials.password);
    userEvent.click(button);

    expect(error).not.toBeInTheDocument();
    await waitFor(() => expect(screen.getByRole('button', { name: /acceder/i })).toBeEnabled(), { timeout: 1000 });
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });
});
