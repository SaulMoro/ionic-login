import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { render, screen, fireEvent, waitFor } from '@testing-library/angular';
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

    const email = screen.getByPlaceholderText('Email');
    const password = screen.getByPlaceholderText('Contraseña');
    const button = screen.getByRole('button', { name: /Acceder/i });
    const toggle = screen.getByRole('checkbox');

    expect(screen.queryByText('Info')).not.toBeInTheDocument();
    expect(email).toHaveValue('');
    expect(password).toHaveValue('');
    expect(toggle).not.toBeChecked();
    expect(button).not.toBeDisabled();

    userEvent.type(email, 'Test');
    fireEvent.blur(email); // Mark as touched
    expect(email).not.toBeValid();

    userEvent.type(password, 'Test');
    fireEvent.blur(password); // Mark as touched
    expect(email).not.toBeValid();

    const validationErrors = screen.getByRole('alert');
    expect(validationErrors).toContainElement(screen.queryByText('La dirección de correo electrónico no es válida'));
    expect(validationErrors).toContainElement(
      screen.queryByText('El campo Contraseña debe tener al menos 5 caracteres'),
    );

    userEvent.type(email, 'test@test.com');
    expect(validationErrors).not.toContainElement(
      screen.queryByText('La dirección de correo electrónico no es válida'),
    );

    userEvent.type(password, 'testpassword');
    expect(validationErrors).not.toBeInTheDocument();
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

    const email = screen.getByPlaceholderText('Email');
    const password = screen.getByPlaceholderText('Contraseña');
    const button = screen.getByRole('button', { name: /Acceder/i });
    const toggle = screen.getByRole('checkbox');
    const errors = screen.queryByText('Error');
    const infoErrors = screen.queryByText('Info');

    expect(errors).not.toBeInTheDocument();
    expect(infoErrors).not.toBeInTheDocument();
    expect(email).toHaveValue('');
    expect(password).toHaveValue('');
    expect(toggle).not.toBeChecked();
    expect(button).not.toBeDisabled();

    userEvent.type(email, credentials.email);
    userEvent.type(password, credentials.password);
    expect(email).toHaveValue(credentials.email);
    expect(email).toBeValid();
    expect(password).toHaveValue(credentials.password);
    expect(password).toBeValid();
    expect(errors).not.toBeInTheDocument();
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

  it('should if possible to login with store integration', async (done) => {
    const credentials = { email: 'test@test.com', password: 'testpassword' };
    const router = jasmine.createSpyObj('Router', ['navigate']);

    await render(LoginContainerComponent, {
      declarations: [LoginButtonComponent, LoginInputComponent, LoginToggleComponent, AlertComponent],
      imports: [StoreModule.forRoot(reducers), EffectsModule.forRoot([AuthEffects])],
      providers: [AuthEffects, AuthService, { provide: Router, useValue: router }],
    });

    const email = screen.getByPlaceholderText('Email');
    const password = screen.getByPlaceholderText('Contraseña');
    const button = screen.getByRole('button', { name: /Acceder/i });

    expect(screen.queryByText('Error')).not.toBeInTheDocument();

    userEvent.clear(email);
    userEvent.type(email, 'prueba@prueba.com');
    userEvent.clear(password);
    userEvent.type(password, 'pruebapassword');
    userEvent.click(button);
    expect(button).toBeDisabled();
    await waitFor(() => expect(screen.getByText('Error')));

    userEvent.clear(email);
    userEvent.type(email, credentials.email);
    userEvent.clear(password);
    userEvent.type(password, credentials.password);
    userEvent.click(button);
    expect(button).toBeDisabled();

    setTimeout(() => {
      expect(router.navigate).toHaveBeenCalledWith(['/']);
      done();
    }, 1000);
  });
});
