import { LessonSummary } from './../data-model/lesson';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-lesson-list',
  templateUrl: './lesson-list.component.html',
  styleUrls: ['./lesson-list.component.css']
})
export class LessonListComponent implements OnInit {
  lessons: LessonSummary[];
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.lessons = this.route.snapshot.data["lessons"];
    console.log('Activated Route', this.route.url);
    // console.log('LessonListComponent', this.lessons);
    // console.log(getResolvedUrl(this.routeSnapshot));
    // console.log(getConfiguredUrl(this.routeSnapshot));
    const ss = this.router.url;
    console.log(ss);
  }


}

