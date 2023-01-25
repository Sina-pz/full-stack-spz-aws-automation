import { MessageStoreService } from './../services/stores/msgStore.service';
import { SharedModule } from './../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterRoutingModule } from './router-routing.module';
import { HomeComponent } from './home/home.component';
import { CourseCardListComponent } from './course-card-list/course-card-list.component';
import { CourseComponent } from './course/course.component';
import { CourseService } from './services/course-router.service';
import { LessonDetailComponent } from './lesson-detail/lesson-detail.component';
import { LessonListComponent } from './lesson-list/lesson-list.component';
import { CourseEditFormComponent } from './course-edit-form/course-edit-form.component';
import { CourseEditFormModalComponent } from './modals/course-edit-form-modal/course-edit-form-modal.component';
import { CoursesStoreService } from './stores/courses-store.service';
import { CourseStoreService } from './stores/course-store.service';

@NgModule({
  declarations: [HomeComponent, CourseCardListComponent, CourseComponent, LessonDetailComponent, LessonListComponent, CourseEditFormComponent, CourseEditFormModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterRoutingModule
  ],
  exports: [],
  providers: [CourseService, CoursesStoreService, CourseStoreService]
})
export class CourseModule { }
