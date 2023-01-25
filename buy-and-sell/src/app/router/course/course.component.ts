import { map, startWith } from 'rxjs/operators';
import { LessonSummary } from './../data-model/lesson';
import { combineLatest, Observable } from 'rxjs';
import { CourseStoreService } from './../stores/course-store.service';
import { MessageStoreService } from './../../services/stores/msgStore.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ActivatedRouteSnapshot, UrlSegment } from '@angular/router';
import { Course, Lesson } from './../../data-model/types';
import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course-router.service';
export interface CourseData {
  course: Course;
  lessons: LessonSummary[];
}
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  // URL Segment: 'routers/courses/serverless-angular'
  // course component fetch its own data: brocken screen, spinning, ..
  // if we get course url from activatedRouter and fetch it from db : miss spelling by user
  // show the screen only when the data is loaded
  course: Course;
  course$: Observable<Course>;
  // Single data pattern
  lessons$: Observable<LessonSummary[]>;
  data$: Observable<CourseData>;
  couponCode: string;
  constructor(private courseService: CourseService, private route: ActivatedRoute, private courseStoreService: CourseStoreService) { }
  //http://localhost:4200/courses/angular-router-course?couponCode=NEW_YEAR&PARAM2=PARAMV2
  // TAKE THE COUpon code
  //am·per·sand
  ngOnInit(): void {
    console.log('im in CourseComponent');

    // ActivatedRoute and ActivatedRouteSnapshot
    // console.log(this.route.snapshot);
    // const courseUrl = this.route.snapshot.params["courseUrl"];
    // route.paramMap.get("courseUrl");ActivatedRouteSnapshot
    // this.courseService.loadCourseByUrl(courseUrl).subscribe((res) => {
    //   console.log('', res);
    // })
    // better solution UX wise
    this.course = this.route.snapshot.data["course"];
    // but we can also get access to observable:
    // this.route.queryParams.subscribe(); emit the value ... over time


    const courseUrl = this.route.snapshot.paramMap.get('courseUrl');
    this.course$ = this.courseStoreService.loadCourseByUrl(courseUrl).pipe(
      startWith(null)
    );
    // this.course$.subscribe(course => {
    //   console.log('in course component', course);
    // });
    // Single Data Obs Pattern
    // instead of having multiple ng-container we can have on for data
    // first get course then get lessons
    this.lessons$ = this.courseService.loadCourseLessonsSummary(courseUrl).pipe(
      startWith([])
    );
    // in this way we can feed DOM with course and then feed with lesson as soon as it is available (except the first value)
    // for first value we should manually handle the issue
    this.data$ = combineLatest([this.course$, this.lessons$]).pipe(map(([course, lessons]) => {
      const data: CourseData = { course, lessons };
      console.log('single pattern', data);
      return data;
    }));
    // coupon code
    // this.route.snapshot.paramMap => all Url
    this.couponCode = this.route.snapshot.queryParamMap.get('couponCode');
    console.log('this.couponCode', this.couponCode);
  }

  confirmExit() {
    return confirm(`Are you sure you want to exit ${this.course.description}`)
  }

}
