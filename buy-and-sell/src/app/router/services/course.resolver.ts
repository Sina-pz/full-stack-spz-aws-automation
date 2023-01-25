import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from './../../data-model/types';
import { CourseService } from './course-router.service';

@Injectable()
export class CourseResolver implements Resolve<Course> {
  constructor(private courseService: CourseService) { }
  resolve(route: ActivatedRouteSnapshot): Observable<Course> {
    // important: the Observable should be complete otherwise th router is not get completed
    // http://localhost:4201/routers/courses/serverless-angular
    const courseUrl = route.paramMap.get("courseUrl");
    console.log('CourseResolver', courseUrl);

    return this.courseService.loadCourseByUrl(courseUrl);
    // the emitted one value and then get completed (this is derived with http Observable so we are sure of)
    // if our observable do not send one value then complete we need:
    // .pipe(first())
  }
}