import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeContainerComponent } from './containers/home-container/home-container.component';

@NgModule({
  declarations: [HomeContainerComponent],
  imports: [SharedModule, HomeRoutingModule],
})
export class HomeModule {}
