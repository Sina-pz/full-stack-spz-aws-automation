import { CoursesStoreService } from '../stores/courses-store.service';
import { MessageStoreService } from './../../services/stores/msgStore.service';
import { LoadingStoreService } from './../../services/stores/loadingstore.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, filter, shareReplay } from 'rxjs/operators';
import { Course } from 'src/app/data-model/types';
import { CourseService } from 'src/app/router/services/course-router.service';
import { sortCoursesBySeqNo } from 'src/app/shared/utilities';
// opPush change detection (@Input and observable in dom | async): a lot of data with a lot of expression in DOM
// with opPush angular update DOM only we push data explicitly
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
// TODO: edit course has not been integrated with backend
export class HomeComponent implements OnInit {

  courses$: Observable<Course[]>;
  // beginnerCourses$: Observable<Course[]>;
  // advancedCourses$: Observable<Course[]>;
  constructor(public courseStoreService: CoursesStoreService) {
  }
  ngOnInit(): void {
    this.reloadCourse();
  }

  reloadCourse() {
    // stateLess home component I
    // this.courses$ = this.courseService.loadAllCourses();
    // each subscription causes a separate http request ? shareReplay()
    // this.beginnerCourses$ = this.filterByCategory(this.courses$, 'BEGINNER');
    // this.courseService.loadAllCourses().pipe(
    //   // tap(console.log),
    //   map((courses: Course[]) => this.categorize())
    // );
    // this.beginnerCourses$ = this.courseStoreService.filterByCategory('BEGINNER');
    // this.advancedCourses$ = this.filterByCategory(this.courses$, 'ADVANCED');
    // this.courseService.loadAllCourses().pipe(
    //   // tap(console.log),
    //   map((courses: Course[]) => courses.filter((course: Course) => course.category === 'ADVANCED'))
    // );
    // this.advancedCourses$ = this.courseStoreService.filterByCategory('ADVANCED');
  }

  // stateLess home component I
  // filterByCategory(courses$: Observable<Course[]>, category: string): Observable<Course[]> {
  //   // setIsLoading
  //   // filter
  //   // sort
  //   return this.loadingStore.showLoaderUntilCompleted<Course[]>(courses$)
  //     .pipe(
  //       map((courses: Course[]) => courses.filter((course: Course) => course.category === category).sort(sortCoursesBySeqNo))
  //     );
  // }

}
