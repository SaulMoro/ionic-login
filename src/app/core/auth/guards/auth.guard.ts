import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { selectAuthenticated } from '../+state/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.store.select(selectAuthenticated).pipe(
      // eslint-disable-next-line ngrx/avoid-mapping-selectors
      map((authed) => authed || this.router.parseUrl('/login')),
      take(1),
    );
  }
}
