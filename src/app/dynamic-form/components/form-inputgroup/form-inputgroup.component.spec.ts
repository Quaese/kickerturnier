import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInputgroupComponent } from './form-inputgroup.component';

describe('FormInputgroupComponent', () => {
  let component: FormInputgroupComponent;
  let fixture: ComponentFixture<FormInputgroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormInputgroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormInputgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
