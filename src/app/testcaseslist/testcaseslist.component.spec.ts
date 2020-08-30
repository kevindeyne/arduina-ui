import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestcaseslistComponent } from './testcaseslist.component';

describe('TestcaseslistComponent', () => {
  let component: TestcaseslistComponent;
  let fixture: ComponentFixture<TestcaseslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestcaseslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestcaseslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
