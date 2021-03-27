import { HttpClient, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { throwError } from 'rxjs';

import { AuthTokenInterceptor } from './auth-token.interceptor';
import { selectToken } from '../+state/auth.selectors';
import { unauthorized } from '../+state/auth.actions';

const API_PATCH = '/tests';

describe('AuthTokenInterceptor', () => {
  it('should be created', () => {
    const interceptor = setup(null);

    expect(interceptor).toBeTruthy();
  });

  it('should add authorization if token exists', () => {
    const token = 'abc==';
    const { httpClient, httpMock } = setup(token);

    httpClient.get(`${API_PATCH}`).subscribe();
    const httpRequest = httpMock.expectOne(`${API_PATCH}`);

    expect(httpRequest.request.headers.has('Authorization')).toEqual(true);
    expect(httpRequest.request.headers.get('Authorization')).toContain(token);
  });

  it('should doesnt add token if not authenticated', () => {
    const { httpClient, httpMock } = setup(null);

    httpClient.get(`${API_PATCH}`).subscribe();
    const httpRequest = httpMock.expectOne(`${API_PATCH}`);

    expect(httpRequest.request.headers.has('Authorization')).toEqual(false);
  });

  it('should dispath unauthorized if error 401 or 403', () => {
    //arrange
    const { store } = setup(null);
    const httpRequestSpy = jasmine.createSpyObj('HttpRequest', ['doesNotMatter']);
    const httpHandlerSpy = jasmine.createSpyObj('HttpHandler', ['handle']);
    const interceptor = new AuthTokenInterceptor(store);

    httpHandlerSpy.handle.and.returnValue(throwError(new HttpErrorResponse({ status: 401 })));
    interceptor.intercept(httpRequestSpy, httpHandlerSpy).subscribe(fail, () => {
      expect(store.dispatch).toHaveBeenCalledWith(unauthorized());
    });

    httpHandlerSpy.handle.and.returnValue(throwError(new HttpErrorResponse({ status: 403 })));
    interceptor.intercept(httpRequestSpy, httpHandlerSpy).subscribe(fail, () => {
      expect(store.dispatch).toHaveBeenCalledWith(unauthorized());
    });
  });

  it('should doesnt dispath unauthorized if !== error 401 or 403', () => {
    //arrange
    const { store } = setup(null);
    const httpRequestSpy = jasmine.createSpyObj('HttpRequest', ['doesNotMatter']);
    const httpHandlerSpy = jasmine.createSpyObj('HttpHandler', ['handle']);
    const interceptor = new AuthTokenInterceptor(store);

    httpHandlerSpy.handle.and.returnValue(throwError(new HttpErrorResponse({ status: 500 })));
    interceptor.intercept(httpRequestSpy, httpHandlerSpy).subscribe(fail, () => {
      expect(store.dispatch).not.toHaveBeenCalledWith(unauthorized());
    });
  });
});

export const setup = (token: string | null) => {
  TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [
      provideMockStore({
        selectors: [
          {
            selector: selectToken,
            value: token,
          },
        ],
      }),
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthTokenInterceptor,
        multi: true,
      },
    ],
  });

  const httpClient = TestBed.inject(HttpClient);
  const httpMock = TestBed.inject(HttpTestingController);
  const store = TestBed.inject(MockStore);
  store.dispatch = jasmine.createSpy();
  return { httpClient, httpMock, store };
};
