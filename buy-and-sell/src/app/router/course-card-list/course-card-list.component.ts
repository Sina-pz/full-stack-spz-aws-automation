import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CoursesStoreService } from '../stores/courses-store.service';
import { Course } from './../data-model/course';
import { CourseEditFormModalComponent } from './../modals/course-edit-form-modal/course-edit-form-modal.component';


@Component({
  selector: 'app-course-card-list',
  templateUrl: './course-card-list.component.html',
  styleUrls: ['./course-card-list.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseCardListComponent implements OnInit, AfterViewInit {
  @Input() courses: Course[];
  @Output() courseChanged = new EventEmitter<void>();
  constructor(private modalService: NgbModal, private courseStoreService: CoursesStoreService) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
  }
  onEdit(course: Course) {
    if (course) {
      // this.loadService.setIsLoading(true);
      const { id } = course;
      const modalRef = this.modalService.open(CourseEditFormModalComponent);
      modalRef.componentInstance.course = course;
      modalRef.result.then(
        (result) => {
          // the save does not work bcz of the put method!
          this.courseStoreService.saveCourse(id, result.course).subscribe();
          this.courseChanged.emit();
        }, (rejected) => {
          console.log('rejected', rejected);
        }
      ).catch(error => console.error(error.message || error));
    }
  }
  // onSubmit(modifiedCourse: Course) {
  //   console.log('course modified in CourseCardListComponent', modifiedCourse);
  // }

}

