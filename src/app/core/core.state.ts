import { NgModule } from '@angular/core';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, RouterReducerState, RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '@environments/environment';
import { AuthEffects, authReducer, AuthState, AUTH_FEATURE_KEY, localstorageAuthMetaReducer } from './auth';

export interface RootState {
  router: RouterReducerState;
  [AUTH_FEATURE_KEY]: AuthState;
}

export const reducers: ActionReducerMap<RootState> = {
  router: routerReducer,
  [AUTH_FEATURE_KEY]: authReducer,
};

@NgModule({
  imports: [
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictActionImmutability: true,
        strictStateImmutability: true,
      },
      metaReducers: [localstorageAuthMetaReducer],
    }),
    EffectsModule.forRoot([AuthEffects]),
    StoreRouterConnectingModule.forRoot({ routerState: RouterState.Minimal }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
})
export class CoreStoreModule {}
