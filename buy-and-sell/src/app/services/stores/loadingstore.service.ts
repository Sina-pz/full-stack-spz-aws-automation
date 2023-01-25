import { BehaviorSubject, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { concatMap, finalize, tap } from 'rxjs/operators';

@Injectable()
export class LoadingStoreService {
  isLoadingSubject$ = new BehaviorSubject<boolean>(false);
  constructor() { }
  setIsLoading(status: boolean) {
    this.isLoadingSubject$.next(status);
  }
  get isLoading$(): Observable<boolean> {
    return this.isLoadingSubject$.asObservable();
  }

  showLoaderUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
    return of(null).pipe(
      // exactly before sending obs$
      tap(() => this.setIsLoading(true)),
      // concat follow order; previous one should be completed before sending new one
      concatMap(() => obs$),
      finalize(() => {
        // This guarantees it will be called on error, complete, and unsubscription
        console.log('LoadingStoreService finalized');
        this.setIsLoading(false);
      }));
  }
}
