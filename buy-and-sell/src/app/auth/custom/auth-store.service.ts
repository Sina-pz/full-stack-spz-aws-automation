import { AppPage } from './../../../../e2e/src/app.po';
import { UserService } from '../../services/data-service/user.service';
import { User } from './../../data-model/types';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';
import { map, shareReplay, tap } from 'rxjs/operators';

// login logout icon : if there is user, it is logout and vice versa
// we keep user after logging-in in the authStore and we can subscribe to it from everywhere
// in every refresh we need to check local storage for user and also

const AUTH_DATA = "auth_data";

@Injectable({
  providedIn: 'root'
})
export class AuthStoreService {
  userSubject$ = new BehaviorSubject<User>(undefined);
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;
  // to be Done
  isSignedIn$: Observable<boolean>;

  constructor(private userService: UserService) {
    this.isLoggedIn$ = this.getUser$().pipe(map(user => !!user));
    this.isLoggedOut$ = this.isLoggedIn$.pipe(map(isLoggedIn => !isLoggedIn));
    // refreshing the page
    const user = localStorage.getItem(AUTH_DATA);
    if (user) {
      this.userSubject$.next(JSON.parse(user) as User);
    }

  }
  getUser$(): Observable<User> {
    return this.userSubject$.asObservable();
  }
  setUser(user: User) {
    this.userSubject$.next(user);
    if (user) {
      localStorage.setItem(AUTH_DATA, JSON.stringify(user));
    } if (user === null) {
      localStorage.removeItem(AUTH_DATA);
    }
  }

  login(email: string, password: string): Observable<User> {
    return this.userService.authUser(email, password)
      .pipe(
        tap(user => {
          console.log('AuthStoreService User', user);
        }),
        shareReplay()
      );
  }

  logout() {
    this.setUser(null);
  }

}
