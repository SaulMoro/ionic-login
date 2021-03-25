// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/dist/zone-testing';
import { getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { ɵDomSharedStylesHost } from '@angular/platform-browser';
import JasmineDOM from '@testing-library/jasmine-dom/dist';
import { configure } from '@testing-library/angular';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import defaultTranslations from 'src/assets/i18n/es.json';

declare const require: {
  context(
    path: string,
    deep?: boolean,
    filter?: RegExp,
  ): {
    keys(): string[];
    <T>(id: string): T;
  };
};

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);

// Patch to ensure SharedStylesHost cleanup styles between Karma test specs
// https://github.com/angular/angular/issues/31834
afterEach(() => getTestBed().inject(ɵDomSharedStylesHost).ngOnDestroy());

// Add Testing Library Jasmine DOM Matchers
beforeAll(() => jasmine.getEnv().addMatchers(JasmineDOM));

configure({
  defaultImports: [
    ReactiveFormsModule,
    IonicModule,
    TranslateTestingModule.withTranslations('es', defaultTranslations).withDefaultLanguage('es'),
  ],
});
