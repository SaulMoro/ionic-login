import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-login-input',
  templateUrl: './login-input.component.html',
  styleUrls: ['./login-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginInputComponent {
  @Input() control: FormControl | null = null;
  @Input() label = '';
  @Input() type = 'text';
  @Input() icon: string | null = null;

  constructor() {}
}
