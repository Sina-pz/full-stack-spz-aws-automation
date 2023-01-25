import { ConfirmExitGuard } from './../auth/confirm-exit.guard';
import { AuthGuard } from './../auth/auth.guard';
import { LessonDetailComponent } from './lesson-detail/lesson-detail.component';
import { LessonListComponent } from './lesson-list/lesson-list.component';
import { CourseResolver } from './services/course.resolver';
import { CourseComponent } from './course/course.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { LessonResolver } from './services/lesson.resolver';
import { LessonsResolver } from './services/lessons.resolver';

//URL Segment: 'routers/courses/serverless-angular'
const routes: Routes = [
  { path: "", component: HomeComponent },
  {
    //URL Segment: 'routers/courses/serverless-angular'
    // fetch course with router link method
    path: ":courseUrl",
    component: CourseComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    canDeactivate: [ConfirmExitGuard],
    // front-end for ux not backend
    // NOTE THAT: if this children would not be resolved and parent is not get resolved as well
    children: [
      {
        //http://localhost:4201/routers/courses/serverless-angular/
        path: "lessons/:lessonSeqNo",
        component: LessonDetailComponent,
        resolve: {
          lesson: LessonResolver
        },
      },
      {
        path: "",
        component: LessonListComponent,
        resolve: {
          lessons: LessonsResolver
        },
      }
    ],
    resolve: {
      course: CourseResolver
    }
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CourseResolver, LessonResolver, LessonsResolver, AuthGuard, ConfirmExitGuard]
})
export class RouterRoutingModule { }
