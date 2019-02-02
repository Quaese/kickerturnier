import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FieldConfig } from './../../models/field-config.interface';

@Component({
  selector: 'form-radiogroup',
  templateUrl: './form-radiogroup.component.html',
  styleUrls: ['./form-radiogroup.component.less']
})
export class FormRadiogroupComponent {
  config: FieldConfig;
  group: FormGroup;

  constructor() {}
}
