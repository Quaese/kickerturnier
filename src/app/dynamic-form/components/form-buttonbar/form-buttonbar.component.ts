import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FieldConfig } from './../../models/field-config.interface';

@Component({
  selector: 'form-buttonbar',
  templateUrl: './form-buttonbar.component.html',
  styleUrls: ['./form-buttonbar.component.less']
})
export class FormButtonbarComponent {
  config: FieldConfig;
  group: FormGroup;

  constructor() {}
}
