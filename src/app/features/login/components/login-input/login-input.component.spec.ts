import { FormControl } from '@angular/forms';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

import { emailValidator } from '@app/shared/util-forms';
import { LoginInputComponent } from './login-input.component';

describe('LoginInputComponent', () => {
  it('should doesnt render if empty control', async () => {
    await render(LoginInputComponent, {
      componentProperties: { control: null, label: 'Email' },
    });

    const input = screen.queryByPlaceholderText('Email');

    expect(input).not.toBeInTheDocument();
  });

  it('should simple input works', async () => {
    await render(LoginInputComponent, {
      componentProperties: { control: new FormControl(''), label: 'Email' },
    });

    const input = screen.getByPlaceholderText('Email');

    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('');

    userEvent.type(input, 'Test');
    expect(input).toHaveValue('Test');
  });

  it('should input with validation works', async () => {
    const control = new FormControl('', emailValidator);
    await render(LoginInputComponent, {
      componentProperties: { control, label: 'Email' },
    });

    const input = screen.getByPlaceholderText('Email');

    expect(input).toBeInTheDocument();
    expect(control.valid).toBe(false);

    userEvent.type(input, 'test@test.com');
    expect(input).toHaveValue('test@test.com');
    expect(control.valid).toBe(true);
  });
});
