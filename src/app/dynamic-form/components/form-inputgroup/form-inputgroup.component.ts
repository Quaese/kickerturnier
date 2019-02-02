import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FieldConfig } from '../../models/field-config.interface';

@Component({
  selector: 'form-inputgroup',
  templateUrl: './form-inputgroup.component.html',
  styleUrls: ['./form-inputgroup.component.less']
})
export class FormInputgroupComponent {
  config: FieldConfig;
  group: FormGroup;

  constructor() {}
}
