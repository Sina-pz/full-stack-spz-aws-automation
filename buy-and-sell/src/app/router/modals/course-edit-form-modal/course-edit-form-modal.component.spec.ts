import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseEditFormModalComponent } from './course-edit-form-modal.component';

describe('CourseEditFormModalComponent', () => {
  let component: CourseEditFormModalComponent;
  let fixture: ComponentFixture<CourseEditFormModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseEditFormModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseEditFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
