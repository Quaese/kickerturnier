import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControlgroupComponent } from './form-controlgroup.component';

describe('FormControlgroupComponent', () => {
  let component: FormControlgroupComponent;
  let fixture: ComponentFixture<FormControlgroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormControlgroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormControlgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
