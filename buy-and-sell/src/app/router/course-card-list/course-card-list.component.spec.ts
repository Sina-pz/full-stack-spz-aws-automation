import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from './../../app.module';
import { CourseModule } from './../router.module';

import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { setupCourses } from '../data-model/mock-course.test';
import { CoursesStoreService } from '../stores/courses-store.service';
import { CourseCardListComponent } from './course-card-list.component';

fdescribe('CourseCardListComponent', () => {
  // tslint:disable-next-line: one-variable-per-declaration
  let component: CourseCardListComponent,
    fixture: ComponentFixture<CourseCardListComponent>,
    debugEl: DebugElement,
    courseStoreSpy: any;

  // test utility: for instancing component and etc, debugging, nativeElement, eventChange
  // async is going keep track of every async
  beforeEach(async(() => {
    courseStoreSpy = jasmine.createSpyObj(['CoursesStoreService', ['saveCourse']]);
    TestBed.configureTestingModule({
      // we can easily have access to whatever we need (that DOM needs)
      // it is better to add all module require not  appModule!
      // for lazyloadedModule
      imports: [AppModule, CourseModule],
      providers: [
        { provide: CoursesStoreService, useValue: courseStoreSpy }
      ]
      // declarations: [ CourseCardListComponent ]
    })
      .compileComponents()
      .then(() => {
        // if resolved
        fixture = TestBed.createComponent(CourseCardListComponent);
        component = fixture.componentInstance;
        debugEl = fixture.debugElement;
        // allow us to query the DOM
        // console.log('CourseCardListComponent in resolved', debugEl);
      });
  }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(CourseCardListComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  fit('should create', () => {
    expect(component).toBeTruthy('cardList component not get created');
  });

  fit('should display the courseList', () => {
    // first pass some data to the component:
    component.courses = setupCourses();
    fixture.detectChanges();
    const course = component.courses[0];
    const cards = debugEl.queryAll(By.css('.card'));
    // console.log('card', cards);

    expect(cards).toBeTruthy('Could not find cards');
    expect(cards.length).toBe(12, 'Unexpected number of courses');
  });

  fit('should display the first course', () => {
    component.courses = setupCourses();

    fixture.detectChanges();
    const course = component.courses[0];

    const card = debugEl.query(By.css('.card:nth-child(1)'));
    const cardBody = card.query(By.css('.card-body'));
    const title = cardBody.query(By.css('.card-title'));
    const image = card.query(By.css('img'));
    // console.log(' card', title.nativeElement.textContent);

    expect(card).toBeTruthy('Could not find course card');
    expect(title.nativeElement.textContent).toBe(course.description);
    expect(image.nativeElement.src).toBe(course.iconUrl);
  });


});
