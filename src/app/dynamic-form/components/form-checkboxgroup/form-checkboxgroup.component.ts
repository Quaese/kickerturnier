import { Component } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

import { FieldConfig } from '../../models/field-config.interface';

@Component({
  selector: 'form-checkboxgroup',
  templateUrl: './form-checkboxgroup.component.html',
  styleUrls: ['./form-checkboxgroup.component.less']
})
export class FormCheckboxGroupComponent {
  config: FieldConfig;
  group: FormGroup;

  constructor() {}

  get controls() {
    return (this.group.get(this.config.name) as FormArray).controls;
  }
}
