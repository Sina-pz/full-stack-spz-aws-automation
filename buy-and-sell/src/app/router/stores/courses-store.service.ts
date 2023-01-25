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
export class CoursesStoreService extends SubscriptionCleaner {
  private coursesSubject$ = new BehaviorSubject<Course[]>(undefined);
  private beginnerCoursesSubject$ = new BehaviorSubject<Course[]>(undefined);
  private advancedCoursesSubject$ = new BehaviorSubject<Course[]>(undefined);
  constructor(private courseService: CourseService, private loadingService: LoadingStoreService) {
    super();
    // I believe if home component loadAll courses make more sense
    this.loadAllCourses();
  }
  setAllCourses(courses: Course[]) {
    this.coursesSubject$.next(courses);
  }
  get courses$(): Observable<Course[]> {
    return this.coursesSubject$.asObservable();
  }

  setBeginnerCourses(courses: Course[]) {
    this.beginnerCoursesSubject$.next(courses);
  }
  get beginnerCourses$(): Observable<Course[]> {
    return this.beginnerCoursesSubject$.asObservable();
  }

  setAdvancedCourses(courses: Course[]) {
    this.advancedCoursesSubject$.next(courses);
  }
  get advancedCourses$(): Observable<Course[]> {
    return this.advancedCoursesSubject$.asObservable();
  }

  private loadAllCourses() {
    const loadCourses$ = this.courseService.loadAllCourses().pipe(takeUntil(this.componentIsDestroyed$), tap(courses => {
      this.updateAndCategorizeAllCourses(courses);
    }
    ));
    this.loadingService.showLoaderUntilCompleted(loadCourses$).subscribe();
  }

  updateAndCategorizeAllCourses(courses: Course[]) {
    this.setAllCourses(courses);
    this.filterByCategory(courses);
  }

  saveCourse(courseId: number, modifiedCourse: Partial<Course>) {
    // UI
    const courses = this.coursesSubject$.getValue();
    const index = courses.findIndex(course => course.id === courseId);
    const course = { ...courses[index], ...modifiedCourse };
    const newCourses = courses.slice(0);
    newCourses[index] = course;
    this.updateAndCategorizeAllCourses(newCourses);
    return this.courseService.saveCourse(courseId, modifiedCourse).pipe(shareReplay());
  }

  filterByCategory(courses: Course[]) {
    let begCourses: Course[] = [];
    let adCourses: Course[] = [];
    courses.forEach(course => {
      if (course.category === 'ADVANCED') {
        adCourses.push(course);
      } else if ('BEGINNER') {
        begCourses.push(course);
      }
    });
    this.setAdvancedCourses(adCourses ? adCourses.sort(sortCoursesBySeqNo) : []);
    this.setBeginnerCourses(begCourses ? begCourses.sort(sortCoursesBySeqNo) : []);
  }
}
