import { NgModule } from '@angular/core';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, RouterReducerState, RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '@environments/environment';

export interface RootState {
  router: RouterReducerState;
  // ...
}

export const reducers: ActionReducerMap<RootState> = {
  router: routerReducer,
  // ...
};

@NgModule({
  imports: [
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictActionImmutability: true,
        strictStateImmutability: true,
      },
    }),
    EffectsModule.forRoot(),
    StoreRouterConnectingModule.forRoot({ routerState: RouterState.Minimal }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
})
export class CoreStoreModule {}
