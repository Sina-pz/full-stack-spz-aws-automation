import { Observable } from 'rxjs';
import { Lesson } from './../../data-model/types';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LessonDetail } from '../data-model/lesson';
import { Location } from "@angular/common";
import { map, tap } from 'rxjs/operators';
@Component({
  selector: 'app-lesson-detail',
  templateUrl: './lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.css']
})
export class LessonDetailComponent implements OnInit {
  lesson$: Observable<LessonDetail>;
  constructor(private router: Router, private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    // snapshot if for first time
    // this.lesson = this.route.snapshot.data["lesson"];
    this.lesson$ = this.route.data.pipe(map(data => {
      return data["lesson"]
    }));
  }

  onBackClick(): void {
    this.location.back();
  }

  previous(lesson: LessonDetail): void {
    //http://localhost:4200/courses/reactive-angular-course/lessons/0
    // parent :  //http://localhost:4200/courses/reactive-angular-course
    console.log("lessonDetail =>", this.route.parent.fragment);

    this.router.navigate(["lessons", lesson.seqNo - 1], {
      relativeTo: this.route.parent,
    });
  }
  next(lesson: LessonDetail): void {
    this.router.navigate(["lessons", lesson.seqNo + 1], {
      relativeTo: this.route.parent,
    });
  }
}
