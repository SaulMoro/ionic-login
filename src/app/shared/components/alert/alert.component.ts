import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent {
  @Input() type: 'info' | 'success' | 'error' = 'info';
  @Input() messages: string | string[] = '';

  constructor() {}

  trackByFn(index: number): number {
    return index;
  }

  get normalizeMessages(): string[] {
    return Array.isArray(this.messages) ? this.messages : [this.messages];
  }
}
