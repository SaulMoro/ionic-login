import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AuthActions, AuthSelectors } from '@app/core/auth';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeContainerComponent {
  user$ = this.store.select(AuthSelectors.selectUser);

  constructor(private store: Store) {}

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }
}
