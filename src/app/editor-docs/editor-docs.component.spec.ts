import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorDocsComponent } from './editor-docs.component';

describe('EditorDocsComponent', () => {
  let component: EditorDocsComponent;
  let fixture: ComponentFixture<EditorDocsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorDocsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
