import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FieldConfig } from './../../models/field-config.interface';

@Component({
  selector: 'form-textarea',
  templateUrl: './form-textarea.component.html',
  styleUrls: ['./form-textarea.component.less']
})
export class FormTextareaComponent {
  config: FieldConfig;
  group: FormGroup;

  constructor() {}
}
