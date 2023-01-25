import { HttpErrorResponse } from '@angular/common/http';
import { sortCoursesBySeqNo } from 'src/app/shared/utilities';
import { Category, Listing } from '../../data-model/types';
import { LoadingStoreService } from '../../services/stores/loadingstore.service';
import { map, mergeMap, takeUntil, tap, shareReplay } from 'rxjs/operators';
import { SubscriptionCleaner } from '../../shared/utilities';
import { CourseService } from '../services/course-router.service';
import { Course } from '../data-model/course';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class CourseStoreService extends SubscriptionCleaner {
  private currentCourseSubject$ = new BehaviorSubject<Course>(undefined);
  constructor(private courseService: CourseService, private loadingService: LoadingStoreService) {
    super();
  }

  setCourse(course: Course) {
    this.currentCourseSubject$.next(course);
  }
  get course$(): Observable<Course> {
    return this.currentCourseSubject$.asObservable();
  }

  loadCourseByUrl(url: string): Observable<Course> {
    return this.courseService.loadCourseByUrl(url).pipe(
      tap(course => {
        this.setCourse(course);
      })
    );
  }
}
