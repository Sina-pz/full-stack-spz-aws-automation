import { Course } from 'src/app/data-model/types';
import { Subject, timer } from 'rxjs';
import { OnDestroy, OnInit, Component } from '@angular/core';
import { ActivatedRouteSnapshot } from "@angular/router";
import { takeUntil } from 'rxjs/operators';

export function getResolvedUrl(route: ActivatedRouteSnapshot): string {
  return route.pathFromRoot
    .map(v => v.url.map(segment => segment.toString()).join('/'))
    .join('/');
}

export function getConfiguredUrl(route: ActivatedRouteSnapshot): string {
  return '/' + route.pathFromRoot
    .filter(v => v.routeConfig)
    .map(v => v.routeConfig!.path)
    .join('/');
}

export function sortCoursesBySeqNo(c1: Course, c2: Course) {
  return c1.seqNo - c2.seqNo;
}

export class SubscriptionCleaner implements OnDestroy {
  protected componentIsDestroyed$ = new Subject<boolean>();
  ngOnDestroy(): void {
    this.componentIsDestroyed$.next(true);
    this.componentIsDestroyed$.complete();
  }
}

// USAGE:
export class SomeComponent extends SubscriptionCleaner implements OnInit {

  constructor() { super(); }

  ngOnInit() {
    const timer1 = timer(500, 500);
    const timer2 = timer(1000, 1000);

    timer1.pipe(takeUntil(this.componentIsDestroyed$))
      .subscribe(() => console.log('timer1'));
    timer2.pipe(takeUntil(this.componentIsDestroyed$))
      .subscribe(() => console.log('timer2'));
  }
}