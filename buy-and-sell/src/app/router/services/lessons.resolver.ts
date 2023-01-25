import { CourseService } from 'src/app/router/services/course-router.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { LessonSummary } from '../data-model/lesson';


@Injectable()
export class LessonsResolver implements Resolve<LessonSummary[]> {
  constructor(private courseService: CourseService) { }
  resolve(route: ActivatedRouteSnapshot): Observable<LessonSummary[]> {
    const courseUrl = route.paramMap.get("courseUrl");
    console.log('Im in LessonsResolver', courseUrl);
    return this.courseService.loadCourseLessonsSummary(courseUrl);
  }

}