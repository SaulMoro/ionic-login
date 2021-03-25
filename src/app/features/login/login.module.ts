import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginContainerComponent } from './containers/login-container/login-container.component';
import { LoginToggleComponent } from './components/login-toggle/login-toggle.component';
import { LoginInputComponent } from './components/login-input/login-input.component';
import { LoginButtonComponent } from './components/login-button/login-button.component';

@NgModule({
  declarations: [LoginContainerComponent, LoginToggleComponent, LoginInputComponent, LoginButtonComponent],
  imports: [SharedModule, LoginRoutingModule],
})
export class LoginModule {}
