import { MessageStoreService } from './../../services/stores/msgStore.service';
import { Observable, throwError } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../../data-model/types';
import { LessonSummary } from '../data-model/lesson';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable()
export class CourseService {
  baseUrl = '/api/router/courses';
  constructor(private http: HttpClient, private msgStoreService: MessageStoreService) { }

  loadAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.baseUrl).pipe(
      shareReplay(),
      catchError((error) => {
        console.log('catchError in loadAllCourses');
        const customMsg = 'Could not load courses';
        return this.handleError(error, customMsg);
      }));
  }

  loadCourseByUrl(courseUrl: string): Observable<Course> {
    return this.http.get<Course>(`${this.baseUrl}/${courseUrl}`).pipe(
      shareReplay(),
      catchError((error) => {
        const customMsg = 'Could not load course by Url';
        return this.handleError(error, customMsg);
      }));
  }

  loadCourseLessonsSummary(courseUrl: string): Observable<LessonSummary[]> {
    return this.http.get<LessonSummary[]>('/api/router/lessons', {
      params: {
        pageSize: "10000",
        courseUrl
      }
    }).pipe(
      map(res => res["payload"]),
      shareReplay(),
      catchError((error) => {
        const customMsg = 'Could not load Lessons Summary';
        return this.handleError(error, customMsg);
      }));
  }

  loadLessonDetail(courseUrl: string, lessonSeqNo: string): Observable<LessonSummary> {
    // http://localhost:4201/routers/courses/serverless-angular/lessons/1
    // we can use /api/lesson-details to be more meaningful and pass parameter with params instead of url
    //`${this.baseUrl}/${courseUrl}/lessons/${lessonSeqNo}
    return this.http.get<LessonSummary>('/api/lesson-details', {
      params: {
        courseUrl,
        lessonSeqNo
      }
    }).pipe(
      shareReplay(),
      catchError((error) => {
        const customMsg = 'Could not load Lessons Detail';
        return this.handleError(error, customMsg);
      })
    );
  }
  saveCourse(courseId: number, changes: Partial<Course>): Observable<Course> {
    return this.http.put<Course>(`/api/router/courses/${courseId}`, changes).pipe(
      shareReplay(),
      catchError((error) => {
        const customMsg = 'Could not save Course';
        return this.handleError(error, customMsg);
      })
    );
  }

  handleError(error: HttpErrorResponse | any, customMsg: string) {
    // throw error without return
    // throwError returns Obs and immediately terminate obs chain
    const customMsgs = error.message ? JSON.stringify(error.message) : customMsg;
    this.msgStoreService.setErrMessage([customMsgs]);
    // console.log('inCourse catchEr', this.msgStoreService.getMessagesValue());
    return throwError(error.message | error);
  }
}
