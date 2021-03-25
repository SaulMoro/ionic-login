import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';

import { AuthActions, AuthSelectors, Credentials } from '@app/core/auth';
import { emailValidator, FormTranslateValidationsService } from '@app/shared/util-forms';

@Component({
  selector: 'app-login-container',
  templateUrl: './login-container.component.html',
  styleUrls: ['./login-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginContainerComponent implements OnInit {
  loading$ = this.store
    .select(AuthSelectors.selectLoading)
    .pipe(tap((loading) => (loading ? this.form.disable() : this.form.enable())));
  error$ = this.store.select(AuthSelectors.selectError);

  form = this.formBuilder.group({
    email: ['', [emailValidator]],
    password: ['', [Validators.required, Validators.minLength(5)]],
    remember: [false],
  });

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    private translateValidations: FormTranslateValidationsService,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(AuthActions.enterLoginPage());
  }

  login(credentials: Credentials): void {
    if (this.form.valid) {
      this.store.dispatch(AuthActions.login({ credentials }));
    }
  }

  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }

  get remember(): FormControl {
    return this.form.get('remember') as FormControl;
  }

  get formErrors(): string[] {
    return this.translateValidations.getFormErrors(this.form, {
      email: 'LOGIN.FIELDS.EMAIL',
      password: 'LOGIN.FIELDS.PASSWORD',
    });
  }

  get showFormErrors(): boolean {
    return this.email.touched && this.password.touched && !!this.formErrors.length;
  }
}
