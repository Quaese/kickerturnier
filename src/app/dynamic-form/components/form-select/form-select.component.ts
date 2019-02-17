import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FieldConfig } from './../../models/field-config.interface';

@Component({
  selector: 'form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.less']
})
export class FormSelectComponent {
  config: FieldConfig;
  group: FormGroup;

  constructor() {}

  onChange(evt) {
    /*
     * Use this validation if always selectedIndex 0 should be invalid
     */

    // const invalid = !evt.target.selectedIndex;

    // // set validity depending on the selected index
    // this.group.controls[this.config.name].setErrors(
    //   invalid ? {'invalidOption': invalid} : null,
    //   { emitEvent: true }
    // );
    // // recalculate value and validity
    // this.group.updateValueAndValidity();
  }
}
