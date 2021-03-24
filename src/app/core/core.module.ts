import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { environment } from '@environments/environment';
import { CoreStoreModule } from './core.state';

// AoT requires an exported function for factories
// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function httpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/');
}

@NgModule({
  declarations: [],
  imports: [
    // angular
    HttpClientModule,
    // ionic
    IonicModule.forRoot(),

    // core state
    CoreStoreModule,

    // third party forRoot()
    TranslateModule.forRoot({
      defaultLanguage: environment.defaultLanguage,
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [IonicModule],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
