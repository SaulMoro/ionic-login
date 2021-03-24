import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { selectAuthenticated } from '../+state/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  constructor(private store: Store) {}

  canActivate(): Observable<boolean> {
    return this.store.select(selectAuthenticated).pipe(
      take(1),
      // eslint-disable-next-line ngrx/avoid-mapping-selectors
      map((authenticated) => !authenticated),
    );
  }
}
