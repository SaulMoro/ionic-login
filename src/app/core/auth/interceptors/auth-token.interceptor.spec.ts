import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { AuthTokenInterceptor } from './auth-token.interceptor';
import { selectToken } from '../+state/auth.selectors';
import { EMPTY } from 'rxjs';

const API_PATCH = '/tests';

describe('AuthTokenInterceptor', () => {
  it('should be created', () => {
    const interceptor = setup(null);

    expect(interceptor).toBeTruthy();
  });

  it('should add authorization if token exists', () => {
    const token = 'abc==';
    const { httpClient, httpMock } = setup(token);

    httpClient.get(`${API_PATCH}`).subscribe(
      () => EMPTY,
      () => EMPTY,
    );
    const httpRequest = httpMock.expectOne(`${API_PATCH}`);

    expect(httpRequest.request.headers.has('Authorization')).toEqual(true);
    expect(httpRequest.request.headers.get('Authorization')).toContain(token);
  });

  it('should doest add token if not authenticated', () => {
    const { httpClient, httpMock } = setup(null);

    httpClient.get(`${API_PATCH}`).subscribe(
      () => EMPTY,
      () => EMPTY,
    );
    const httpRequest = httpMock.expectOne(`${API_PATCH}`);

    expect(httpRequest.request.headers.has('Authorization')).toEqual(false);
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
  return { httpClient, httpMock };
};
