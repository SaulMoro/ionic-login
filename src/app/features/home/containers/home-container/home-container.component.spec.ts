import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { render, screen, fireEvent } from '@testing-library/angular';

import { AuthActions, AuthSelectors } from '@app/core/auth';
import { HomeContainerComponent } from './home-container.component';

describe('HomeContainerComponent', () => {
  it('should get user data and logout', async () => {
    const user = {
      email: 'vip@vip.com',
      name: 'Test VIP Client',
      roles: ['vip', 'client'],
    };

    await render(HomeContainerComponent, {
      providers: [provideMockStore({ selectors: [{ selector: AuthSelectors.selectUser, value: user }] })],
    });

    const store = TestBed.inject(MockStore);
    store.dispatch = jasmine.createSpy();

    const button = screen.getByRole('button', { name: /Cerrar Sesión/i });
    await screen.findByText(/vip@vip.com/i);
    await screen.findByText(/Test VIP Client/i);
    await screen.findByText(/vip/i);
    await screen.findByText(/client/i);

    fireEvent.click(button);

    expect(store.dispatch).toHaveBeenCalledWith(AuthActions.logout());
  });
});
