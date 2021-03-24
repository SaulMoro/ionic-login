import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginContainerComponent } from './containers/login-container/login-container.component';

@NgModule({
  declarations: [LoginContainerComponent],
  imports: [SharedModule, LoginRoutingModule],
})
export class LoginModule {}
