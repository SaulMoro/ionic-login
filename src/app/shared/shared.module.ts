import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { AutofocusDirective } from './directives/autofocus.directive';

const EXPORTED_DECLARATIONS = [AutofocusDirective];

const IMPORTED_EXPORTS = [CommonModule, FormsModule, IonicModule, TranslateModule];

@NgModule({
  declarations: [...EXPORTED_DECLARATIONS],
  imports: [...IMPORTED_EXPORTS, RouterModule],
  exports: [...IMPORTED_EXPORTS, ...EXPORTED_DECLARATIONS],
})
export class SharedModule {}
