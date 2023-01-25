import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from "@angular/core";

import { Observable } from 'rxjs';
import { CourseService } from './course-router.service';
import { LessonSummary } from '../data-model/lesson';

@Injectable()
export class LessonResolver implements Resolve<LessonSummary> {
  constructor(private courseService: CourseService) { }
  resolve(route: ActivatedRouteSnapshot): Observable<LessonSummary> {

    const courseUrl = route.parent.paramMap.get("courseUrl");
    const lessonSeqNo = route.paramMap.get("lessonSeqNo");
    console.log(courseUrl, '  lessonSeqNo', lessonSeqNo);
    return this.courseService.loadLessonDetail(courseUrl, lessonSeqNo);
  }

}