import { MessageStoreService } from './../../../services/stores/msgStore.service';
import { LoadingStoreService } from './../../../services/stores/loadingstore.service';
import { Course } from './../../data-model/course';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input } from '@angular/core';
export interface EditFormModal {
  course: Course;
  message: string;
}

@Component({
  selector: 'app-course-edit-form-modal',
  templateUrl: './course-edit-form-modal.component.html',
  styleUrls: ['./course-edit-form-modal.component.css'],
  providers: [MessageStoreService]
})
export class CourseEditFormModalComponent implements OnInit {
  @Input() course: Course;
  formResult: EditFormModal;

  constructor(public activeModal: NgbActiveModal, private msgSrv: MessageStoreService) { }

  ngOnInit(): void {
    this.msgSrv.setErrMessage(['Modal Error in CourseEditFormModal', 'for Test']);
  }
  onSubmit(modifiedCourse: Course) {
    if (modifiedCourse) {
      const result: EditFormModal = { course: modifiedCourse, message: 'Form Submit' };
      this.activeModal.close(result);
    }
  }
  onFormClose() {
    const result: EditFormModal = { course: null, message: 'Close click' };
    this.activeModal.close(result);
  }

}
