import { Listing } from './../data-model/types';
import { map } from 'rxjs/operators';
import { AuthStoreService } from './custom/auth-store.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authStore: AuthStoreService, private router: Router) { }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.checkIfAuthenticated()
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.checkIfAuthenticated()
  }

  private checkIfAuthenticated(): Observable<boolean | UrlTree> {
    return this.authStore.isLoggedIn$.pipe(map((isLoggedIn: boolean) =>
      isLoggedIn ?
        isLoggedIn :
        // this.router.navigate(['/Listings']);
        this.router.parseUrl('/Listings')
    ))
  }

}