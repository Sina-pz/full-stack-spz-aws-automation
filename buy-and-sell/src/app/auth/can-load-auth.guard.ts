import { first, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AuthStoreService } from './custom/auth-store.service';
import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';


@Injectable()
export class CanLoadAuthGuard implements CanLoad {
  constructor(private authStore: AuthStoreService, private router: Router) { }
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    // this observable is long running that means it does not complete by itself so we need to force completion after first value by first()
    return this.authStore.isLoggedIn$.pipe(
      first(),
      tap(isLoggedIn => {
        if (!isLoggedIn) {
          return this.router.navigateByUrl('/listings');
        }
      })

    );
  }
}
