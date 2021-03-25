import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginContainerComponent } from './containers/login-container/login-container.component';
import { LoginToggleComponent } from './components/login-toggle/login-toggle.component';

@NgModule({
  declarations: [LoginContainerComponent, LoginToggleComponent],
  imports: [SharedModule, LoginRoutingModule],
})
export class LoginModule {}
