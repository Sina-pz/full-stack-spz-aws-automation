import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCompModalComponent } from './test-comp-modal.component';

describe('TestCompModalComponent', () => {
  let component: TestCompModalComponent;
  let fixture: ComponentFixture<TestCompModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestCompModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCompModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
