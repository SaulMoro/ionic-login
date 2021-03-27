/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentFixture } from '@angular/core/testing';
import {
  waitFor as atlWaitFor,
  waitForElementToBeRemoved as atlWaitForElementToBeRemoved,
} from '@testing-library/angular';
import { waitForOptions } from '@testing-library/dom';

export const clearPage = <T extends any>(_fixture?: ComponentFixture<T>): void => {
  if (!document) return;

  const elements = document.querySelectorAll('body > *');
  elements.forEach((element) => {
    if (/^(abp|ngb)-/i.test(element.tagName)) document.body.removeChild(element);
  });
};

/**
 * Re-export waitFor with patched waitFor for Jasmine
 */
export const waitFor = async <T>(
  callback: () => T extends Promise<any> ? never : T,
  options?: waitForOptions,
): Promise<T> => {
  await new Promise((res) => setTimeout(res, options?.timeout || 150));
  return atlWaitFor(callback, options);
};

/**
 * Re-export waitForElementToBeRemoved with patched waitForElementToBeRemoved for Jasmine
 */
export const waitForElementToBeRemoved = async <T>(
  callback: (() => T) | T,
  options?: waitForOptions,
): Promise<void> => {
  await new Promise((res) => setTimeout(res, options?.timeout || 150));
  return atlWaitForElementToBeRemoved(callback, options);
};
