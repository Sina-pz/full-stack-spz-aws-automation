import { MessageStoreService } from './../../services/stores/msgStore.service';
import { LoadingStoreService } from './../../services/stores/loadingstore.service';
import { takeUntil, debounceTime } from 'rxjs/operators';
import { SubscriptionCleaner } from './../../shared/utilities';
import { FormGroup } from '@angular/forms';
import { Course } from 'src/app/data-model/types';
import { Validators, FormBuilder } from '@angular/forms';
import { User } from './../../data-model/types';
import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core';
import { getTodayDate } from './../../constants/constance'

@Component({
  selector: 'app-course-edit-form',
  templateUrl: './course-edit-form.component.html',
  styleUrls: ['./course-edit-form.component.css'],
  providers: [LoadingStoreService]
})
export class CourseEditFormComponent extends SubscriptionCleaner implements OnInit {

  @Input() set course(crs: Course) {
    if (crs) {
      console.log('course form is set in setter');
      this.initializeForm();
      // this.loadingService.setIsLoading(true);
      // this.msgSrv.setMsg(['New Err']);
      this.populateForm(crs);
    }
  }
  @Output() submittedForm = new EventEmitter<Partial<User>>();
  @Output() close = new EventEmitter<void>();
  form: FormGroup;

  constructor(private fb: FormBuilder, private loadingService: LoadingStoreService) {
    super();
  }
  ngOnInit(): void {
    // this.form.valueChanges.pipe(takeUntil(this.componentIsDestroyed$), debounceTime(2000)).subscribe(value => {
    //   console.log('selected =>', value);
    // });
  }

  initializeForm() {
    this.form = this.fb.group({
      description: ['', {
        validators: [Validators.required],
      }],
      category: ['BEGINNER', {
        validators: [Validators.required],
      }],
      releaseAt: [getTodayDate, Validators.required],
      longDescription: ['', Validators.required]
    });
  }

  populateForm(course: Course) {
    const { description, category, longDescription } = course;
    const releaseAt = getTodayDate();
    this.form.patchValue({ description, category, releaseAt, longDescription });
    this.loadingService.setIsLoading(false);
  }
  submit(form: FormGroup) {
    if (form.valid) {
      const fromValue: Partial<Course> = form.getRawValue();
      if (fromValue) {
        this.submittedForm.emit(fromValue);
      }
    }
    this.form.reset();
  }
  onClose() {
    this.close.emit();
    this.form.reset();
  }

  get description() {
    return this.form.get('description');
  }
  get category() {
    return this.form.get('category');
  }
  get releaseAt() {
    return this.form.get('releaseAt');
  }
  get longDescription() {
    return this.form.get('longDescription');
  }

}
