import { TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { TranslateTestingModule } from 'ngx-translate-testing';

import { FormTranslateValidationsService } from './form-validations.service';

describe('FormTranslateValidationsService', () => {
  let service: FormTranslateValidationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateTestingModule
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          .withTranslations('es', require('../../../assets/i18n/es.json'))
          .withDefaultLanguage('es'),
      ],
    });
    service = TestBed.inject(FormTranslateValidationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getFormControlErrors get errors empty if not form control', () => {
    const errors = service.getFormControlErrors(null, 'test');

    expect(errors).toBeTruthy();
    expect(errors).toEqual([]);
  });

  it('should getFormControlErrors get errors empty if form control ok', () => {
    const control: any = {
      errors: {},
    };
    const errors = service.getFormControlErrors(control, 'test');

    expect(errors).toBeTruthy();
    expect(errors.length).toBeFalsy();
  });

  it('should getFormControlErrors get errors if form control with errors', () => {
    const control: any = {
      errors: { required: 'required' },
    };

    const errors = service.getFormControlErrors(control, 'test');

    expect(errors).toBeTruthy();
    expect(errors.length).toBeTruthy();
    expect(errors[0]).toEqual('El campo test es obligatorio');
  });

  it('should getFormErrors get errors empty if not form control', () => {
    const form = new FormGroup({});

    const errors = service.getFormErrors(form);

    expect(errors).toBeTruthy();
    expect(errors).toEqual([]);
  });

  it('should getFormErrors get errors get errors empty if form controls ok', () => {
    const control: any = {
      errors: {},
    };
    const controls = { test: control };
    const form: any = {
      controls,
      get: jasmine.createSpy().and.returnValue(controls.test),
    };

    const errors = service.getFormErrors(form);

    expect(errors).toBeTruthy();
    expect(errors.length).toBeFalsy();
    expect(form.get).toHaveBeenCalledWith('test');
  });

  it('should getFormErrors get errors if form control with errors', () => {
    const control: any = {
      errors: { required: 'required' },
    };
    const controls = { test: control };
    const form: any = {
      controls,
      get: jasmine.createSpy().and.returnValue(controls.test),
    };

    const errors = service.getFormErrors(form);

    expect(errors).toBeTruthy();
    expect(errors.length).toBeTruthy();
    expect(form.get).toHaveBeenCalledWith('test');
    expect(errors[0]).toEqual('El campo test es obligatorio');
  });

  it('should minlength validation works', () => {
    const control: any = {
      errors: { minlength: 'minlength', requiredLength: 5 },
    };
    const controls = { test: control };
    const form: any = {
      controls,
      get: jasmine.createSpy().and.returnValue(controls.test),
    };

    const errors = service.getFormErrors(form);

    expect(errors).toBeTruthy();
    expect(errors.length).toBeTruthy();
    expect(form.get).toHaveBeenCalledWith('test');
    expect(errors[0]).toContain('El campo test debe tener al menos');
  });

  it('should email validation works', () => {
    const control: any = {
      errors: { email: 'email' },
    };
    const controls = { test: control };
    const form: any = {
      controls,
      get: jasmine.createSpy().and.returnValue(controls.test),
    };

    const errors = service.getFormErrors(form);

    expect(errors).toBeTruthy();
    expect(errors.length).toBeTruthy();
    expect(form.get).toHaveBeenCalledWith('test');
    expect(errors[0]).toEqual('La dirección de correo electrónico no es válida');
  });

  it('should getFormControlErrors translate fieldKey if exists', () => {
    const control: any = {
      errors: { required: 'required' },
    };

    const errors = service.getFormControlErrors(control, 'LOGIN.FIELDS.EMAIL');

    expect(errors).toBeTruthy();
    expect(errors.length).toBeTruthy();
    expect(errors[0]).toEqual('El campo Email es obligatorio');
  });
});
