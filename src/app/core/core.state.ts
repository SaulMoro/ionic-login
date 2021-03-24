import { NgModule } from '@angular/core';
import { ActionReducer, ActionReducerMap, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, RouterReducerState, RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { localStorageSync } from 'ngrx-store-localstorage';

import { environment } from '@environments/environment';
import { authReducer, AuthState, AUTH_FEATURE_KEY } from './auth';

export interface RootState {
  router: RouterReducerState;
  [AUTH_FEATURE_KEY]: AuthState;
}

export const reducers: ActionReducerMap<RootState> = {
  router: routerReducer,
  [AUTH_FEATURE_KEY]: authReducer,
};

export const localStorageSyncMetaReducer = (reducer: ActionReducer<RootState>): ActionReducer<RootState> =>
  localStorageSync({
    keys: [AUTH_FEATURE_KEY],
    rehydrate: true,
    removeOnUndefined: true,
    storageKeySerializer: (key) => `IL_${key}`,
  })(reducer);

@NgModule({
  imports: [
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictActionImmutability: true,
        strictStateImmutability: true,
      },
      metaReducers: [localStorageSyncMetaReducer],
    }),
    EffectsModule.forRoot(),
    StoreRouterConnectingModule.forRoot({ routerState: RouterState.Minimal }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
})
export class CoreStoreModule {}
