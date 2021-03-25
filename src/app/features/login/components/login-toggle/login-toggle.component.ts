import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-login-toggle',
  templateUrl: './login-toggle.component.html',
  styleUrls: ['./login-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginToggleComponent {
  @Input() control: FormControl | null = null;
  @Input() label = '';

  constructor() {}
}
