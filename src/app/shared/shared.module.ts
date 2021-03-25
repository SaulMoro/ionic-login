import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { AutofocusDirective } from './directives/autofocus.directive';
import { AlertComponent } from './components/alert/alert.component';

const EXPORTED_DECLARATIONS = [AutofocusDirective, AlertComponent];

const IMPORTED_EXPORTS = [CommonModule, FormsModule, ReactiveFormsModule, IonicModule, TranslateModule];

@NgModule({
  declarations: [...EXPORTED_DECLARATIONS],
  imports: [...IMPORTED_EXPORTS, RouterModule],
  exports: [...IMPORTED_EXPORTS, ...EXPORTED_DECLARATIONS],
})
export class SharedModule {}
