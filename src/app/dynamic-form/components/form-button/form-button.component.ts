import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FieldConfig } from './../../models/field-config.interface';

@Component({
  selector: 'form-button',
  templateUrl: './form-button.component.html',
  styleUrls: ['./form-button.component.less']
})
export class FormButtonComponent {
  config: FieldConfig;
  group: FormGroup;

  constructor() { }
}
