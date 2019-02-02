import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FieldConfig } from '../../models/field-config.interface';

@Component({
  selector: 'app-form-checkbox',
  templateUrl: './form-checkbox.component.html',
  styleUrls: ['./form-checkbox.component.less']
})
export class FormCheckboxComponent implements OnInit {
  config: FieldConfig;
  group: FormGroup;

  private id: string | number;

  constructor() {}

  ngOnInit() {
    this.id = this.config.id || (new Date().getTime());
  }
}
