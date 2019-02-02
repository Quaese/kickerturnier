import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormButtonbarComponent } from './form-buttonbar.component';

describe('FormButtonbarComponent', () => {
  let component: FormButtonbarComponent;
  let fixture: ComponentFixture<FormButtonbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormButtonbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormButtonbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
