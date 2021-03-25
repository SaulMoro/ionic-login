import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginButtonComponent {
  @Input() loading: boolean | null = false;

  constructor() {}
}
