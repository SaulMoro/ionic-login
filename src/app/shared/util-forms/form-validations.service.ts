import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class FormTranslateValidationsService {
  constructor(private translate: TranslateService) {}

  getFormErrors(form: FormGroup, fieldKeys?: { [fieldKey: string]: string }): string[] {
    return Object.keys(form.controls)
      .map((formKey: string) => this.getFormControlErrors(form.get(formKey), fieldKeys ? fieldKeys[formKey] : formKey))
      .reduce((errors, value) => errors.concat(value), [])
      .filter(Boolean);
  }

  getFormControlErrors(control: AbstractControl | null, fieldKeyToTranslate: string): string[] {
    const controlErrors: ValidationErrors | null = control?.errors ?? null;
    if (controlErrors) {
      const name = this.translate.instant(fieldKeyToTranslate) ?? fieldKeyToTranslate;
      return Object.keys(controlErrors).map((keyError) => {
        const error = controlErrors[keyError];
        switch (keyError) {
          case 'required':
            return this.translate.instant('VALIDATIONS.REQUIRED', { name });
          case 'minlength':
            return this.translate.instant('VALIDATIONS.MIN_LENGTH', { name, min: '' + error.requiredLength });
          case 'email':
            return this.translate.instant('VALIDATIONS.EMAIL');
          default:
            return '';
        }
      });
    }
    return [];
  }
}
