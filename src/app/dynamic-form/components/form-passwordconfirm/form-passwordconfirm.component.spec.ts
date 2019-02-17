import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPasswordconfirmComponent } from './form-passwordconfirm.component';

describe('FormPasswordconfirmComponent', () => {
  let component: FormPasswordconfirmComponent;
  let fixture: ComponentFixture<FormPasswordconfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPasswordconfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPasswordconfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
