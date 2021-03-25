import { render, screen } from '@testing-library/angular';
import { AutofocusDirective } from './autofocus.directive';

describe('LoginToggleComponent', () => {
  it('should focused is button have autofocus', async () => {
    await render(AutofocusDirective, {
      template: `<button autofocus data-testid="dir"></button>`,
    });

    const button = screen.getByTestId('dir');

    expect(button).toHaveFocus();
  });

  it('should not focused is button doesnt have autofocus', async () => {
    await render(AutofocusDirective, {
      template: `<button data-testid="dir"></button>`,
    });

    const button = screen.getByTestId('dir');

    expect(button).not.toHaveFocus();
  });
});
