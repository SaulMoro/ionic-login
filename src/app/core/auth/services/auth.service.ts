import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Credentials, LoginResponse, User } from '../models';

export const USERS: { [id: string]: User } = {
  'test@test.com': { email: 'test@test.com', name: 'Test Client', roles: ['client'] },
  'vip@vip.com': { email: 'vip@vip.com', name: 'Test VIP Client', roles: ['vip', 'client'] },
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  login({ email }: Credentials): Observable<LoginResponse> {
    const user = USERS[email];

    // Simulate a failed login to display the error message for the login form.
    if (!user) {
      return throwError('Invalid credentials');
    }
    return of({ user, token: 'abc==' });
  }

  logout(): Observable<boolean> {
    // mock api response always true
    return of(true);
  }
}
