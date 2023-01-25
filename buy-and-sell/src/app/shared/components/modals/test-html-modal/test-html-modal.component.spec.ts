import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestHtmlModalComponent } from './test-html-modal.component';

describe('TestHtmlModalComponent', () => {
  let component: TestHtmlModalComponent;
  let fixture: ComponentFixture<TestHtmlModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestHtmlModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHtmlModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
