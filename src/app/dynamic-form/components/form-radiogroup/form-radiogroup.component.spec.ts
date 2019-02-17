import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRadiogroupComponent } from './form-radiogroup.component';

describe('FormRadiogroupComponent', () => {
  let component: FormRadiogroupComponent;
  let fixture: ComponentFixture<FormRadiogroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormRadiogroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRadiogroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
