import { render, screen, fireEvent } from '@testing-library/angular';

import { LoginButtonComponent } from './login-button.component';

describe('LoginButtonComponent', () => {
  it('should button enabled if loading false', async () => {
    await render(LoginButtonComponent, {
      componentProperties: { loading: false },
    });

    const button = screen.getByRole('button', { name: /Acceder/i });

    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();

    fireEvent.click(button);
  });

  it('should button disabled if loading', async () => {
    await render(LoginButtonComponent, {
      componentProperties: { loading: true },
    });

    const button = screen.getByRole('button', { name: /Acceder/i });

    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
});
