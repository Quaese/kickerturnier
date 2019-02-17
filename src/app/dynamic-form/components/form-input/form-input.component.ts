import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FieldConfig } from './../../models/field-config.interface';

@Component({
  selector: 'form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.less']
})
export class FormInputComponent {
  config: FieldConfig;
  group: FormGroup;

  constructor() { }
}
