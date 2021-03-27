// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/dist/zone-testing';
import { getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { ɵDomSharedStylesHost } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import JasmineDOM from '@testing-library/jasmine-dom/dist';
import { configure } from '@testing-library/angular';
import { TranslateTestingModule } from 'ngx-translate-testing';
import defaultTranslations from 'src/assets/i18n/es.json';
import { clearPage } from './test-helpers';

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

// Add Testing Library Jasmine DOM Matchers
beforeAll(() => jasmine.getEnv().addMatchers(JasmineDOM));

afterEach(() => {
  // Patch to ensure SharedStylesHost cleanup styles between Karma test specs
  // https://github.com/angular/angular/issues/31834
  getTestBed().inject(ɵDomSharedStylesHost).ngOnDestroy();

  // For DOM testing
  clearPage();
});

configure({
  defaultImports: [
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateTestingModule.withTranslations('es', defaultTranslations).withDefaultLanguage('es'),
  ],
  dom: {
    getElementError: (message) => {
      const error = new Error(message ?? 'Unhandled error');
      error.name = 'TestingLibraryElementError';
      error.stack = undefined;
      return error;
    },
  },
});

// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
