import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { render, screen, fireEvent } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

import { AuthActions, AuthEffects, AuthSelectors } from '@app/core/auth';
import { reducers } from '@app/core/core.state';
import { AuthService } from '@app/core/auth/services/auth.service';
import { AlertComponent } from '@app/shared/components/alert/alert.component';
import { LoginContainerComponent } from './login-container.component';
import { LoginButtonComponent } from '../../components/login-button/login-button.component';
import { LoginInputComponent } from '../../components/login-input/login-input.component';
import { LoginToggleComponent } from '../../components/login-toggle/login-toggle.component';

describe('LoginContainerComponent', () => {
  it('should disabled button if loading', async () => {
    await render(LoginContainerComponent, {
      declarations: [LoginButtonComponent, LoginInputComponent, LoginToggleComponent, AlertComponent],
      providers: [
        provideMockStore({
          selectors: [
            { selector: AuthSelectors.selectLoading, value: true },
            { selector: AuthSelectors.selectError, value: null },
          ],
        }),
      ],
    });

    const store = TestBed.inject(MockStore);
    store.dispatch = jasmine.createSpy();

    const button = screen.getByRole('button', { name: /Acceder/i });

    expect(button).toBeDisabled();
  });

  it('should get validations errors', async () => {
    await render(LoginContainerComponent, {
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

    const email = screen.getByPlaceholderText(/email/i);
    const password = screen.getByPlaceholderText(/contraseña/i);
    const button = screen.getByRole('button', { name: /acceder/i });
    const toggle = screen.getByRole('checkbox');

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(email).toHaveValue('');
    expect(password).toHaveValue('');
    expect(toggle).not.toBeChecked();
    expect(button).not.toBeDisabled();

    userEvent.click(email);
    userEvent.type(email, 'Test');
    userEvent.click(password);
    userEvent.type(password, 'pass');
    fireEvent.blur(password);
    fireEvent.click(button);

    await screen.findByText(/^la direcci/i);
    screen.getByText(/^el campo/i);

    fireEvent.change(email, { target: { value: '' } });
    userEvent.type(email, 'test@test.com');
    fireEvent.change(password, { target: { value: '' } });
    userEvent.type(password, 'testpassword');
    userEvent.click(button);

    expect(screen.queryByText(/^la direcci/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/^el campo/i)).not.toBeInTheDocument();
  });

  it('should if possible to login', async () => {
    const credentials = { email: 'test@test.com', password: 'testpassword' };

    await render(LoginContainerComponent, {
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

    const store = TestBed.inject(MockStore);
    store.dispatch = jasmine.createSpy();

    const email = screen.getByPlaceholderText(/email/i);
    const password = screen.getByPlaceholderText(/contraseña/i);
    const button = screen.getByRole('button', { name: /acceder/i });
    const toggle = screen.getByRole('checkbox');
    const infoErrors = screen.queryByRole('alert');

    expect(infoErrors).not.toBeInTheDocument();
    expect(email).toHaveValue('');
    expect(password).toHaveValue('');
    expect(toggle).not.toBeChecked();
    expect(button).not.toBeDisabled();

    userEvent.click(email);
    userEvent.type(email, credentials.email);
    userEvent.click(password);
    userEvent.type(password, credentials.password);
    fireEvent.blur(password);
    expect(email).toHaveValue(credentials.email);
    expect(email).toBeValid();
    expect(password).toHaveValue(credentials.password);
    expect(password).toBeValid();
    expect(infoErrors).not.toBeInTheDocument();

    userEvent.click(button);
    expect(store.dispatch).toHaveBeenCalledWith(
      AuthActions.login({ credentials: { ...credentials, remember: false } }),
    );

    userEvent.click(toggle);
    expect(toggle).toBeChecked();

    userEvent.click(button);
    expect(store.dispatch).toHaveBeenCalledWith(AuthActions.login({ credentials: { ...credentials, remember: true } }));
  });

  it('should if possible to login with store integration', async () => {
    const credentials = { email: 'test@test.com', password: 'testpassword' };
    const mockRouter = {
      navigate: jasmine.createSpy('navigate'),
    };

    await render(LoginContainerComponent, {
      declarations: [LoginButtonComponent, LoginInputComponent, LoginToggleComponent, AlertComponent],
      imports: [StoreModule.forRoot(reducers), EffectsModule.forRoot([AuthEffects])],
      providers: [AuthEffects, AuthService, { provide: Router, useValue: mockRouter }],
    });

    const email = screen.getByPlaceholderText(/email/i);
    const password = screen.getByPlaceholderText(/contraseña/i);
    const button = screen.getByRole('button', { name: /acceder/i });
    const toggle = screen.getByRole('checkbox');

    expect(email).toHaveValue('');
    expect(password).toHaveValue('');
    expect(toggle).not.toBeChecked();
    expect(button).not.toBeDisabled();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();

    userEvent.click(email);
    userEvent.type(email, 'prueba@prueba.com');
    userEvent.click(password);
    userEvent.type(password, 'pruebapassword');
    fireEvent.blur(password);
    userEvent.click(button);
    const error = await screen.findByRole('alert');

    fireEvent.change(email, { target: { value: '' } });
    userEvent.type(email, credentials.email);
    fireEvent.change(password, { target: { value: '' } });
    userEvent.type(password, credentials.password);
    userEvent.click(button);

    expect(error).not.toBeInTheDocument();
  });
});
