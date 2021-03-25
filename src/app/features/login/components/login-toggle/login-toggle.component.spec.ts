import { FormControl } from '@angular/forms';
import { render, screen, fireEvent } from '@testing-library/angular';

import { LoginToggleComponent } from './login-toggle.component';

describe('LoginToggleComponent', () => {
  it('should doesnt render if empty control', async () => {
    await render(LoginToggleComponent, {
      componentProperties: { control: null, label: 'Recordar' },
    });

    const toggle = screen.queryByRole('checkbox');

    expect(toggle).not.toBeInTheDocument();
  });

  it('should control works', async () => {
    await render(LoginToggleComponent, {
      componentProperties: { control: new FormControl(false), label: 'Recordar' },
    });

    const toggle = screen.getByRole('checkbox');
    const label = screen.getByText('Recordar');

    expect(label).toBeInTheDocument();
    expect(toggle).not.toBeChecked();

    fireEvent.click(toggle);
    expect(toggle).toBeChecked();
  });
});
