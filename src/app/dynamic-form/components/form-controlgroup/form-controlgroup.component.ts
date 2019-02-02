import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FieldConfig } from './../../models/field-config.interface';

@Component({
  selector: 'form-controlgroup',
  templateUrl: './form-controlgroup.component.html',
  styleUrls: ['./form-controlgroup.component.less']
})
export class FormControlgroupComponent {
  config: FieldConfig;
  group: FormGroup;

  constructor() {}
}
