import { render, screen } from '@testing-library/angular';

import { AlertComponent } from './alert.component';

describe('AlertComponent', () => {
  it('should show info messages', async () => {
    const { rerender } = await render(AlertComponent, {
      componentProperties: { messages: 'Test' },
    });

    expect(screen.getByText('Info')).toBeInTheDocument();
    expect(screen.getByText('Test')).toBeInTheDocument();

    rerender({ messages: ['Test', 'Test2'] });

    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText('Test2')).toBeInTheDocument();
  });

  it('should show success messages', async () => {
    const { rerender } = await render(AlertComponent, {
      componentProperties: { messages: 'Test', type: 'success' },
    });

    expect(screen.getByText('Operación finalizada satisfactoriamente')).toBeInTheDocument();
    expect(screen.getByText('Test')).toBeInTheDocument();

    rerender({ messages: ['Test', 'Test2'] });

    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText('Test2')).toBeInTheDocument();
  });

  it('should show error messages', async () => {
    const { rerender } = await render(AlertComponent, {
      componentProperties: { messages: 'Test', type: 'error' },
    });

    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('Test')).toBeInTheDocument();

    rerender({ messages: ['Test', 'Test2'] });

    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText('Test2')).toBeInTheDocument();
  });
});
