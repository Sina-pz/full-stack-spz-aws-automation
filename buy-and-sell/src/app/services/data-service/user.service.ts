import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../data-model/types';
import { shareReplay, catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  authUser(email: string, password: string): Observable<User> {
    return this.http.get<User>('/api/routers/login', {
      params: { email, password }
    })
      .pipe(
        // tap(res => console.log('res["payload"] in userService', res["payload"])
        // ),
        map(res => res["payload"]),
        shareReplay(),
        catchError(this.handleError)
      )
  }

  handleError(error: HttpErrorResponse) {
    console.error('An error occurred in the userService');
    // throwError(error.message || error)
    return throwError(new Error('Could not find user'))
  }
}
