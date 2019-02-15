import { Component, ChangeDetectorRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { FieldConfig } from '../../../dynamic-form/models/field-config.interface';
import { FieldClasses } from '../../../dynamic-form/models/field-classes.interface';

import { charValidator } from '../../../dynamic-form/validators/char.validator';
import { selectValidator } from '../../../dynamic-form/validators/select.validator';
import { passwordConfirmValidator } from 'src/app/dynamic-form/validators/passwordconfirm.validator';

import { DynamicFormComponent } from '../../../dynamic-form/components/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.less']
})
export class UserCreateComponent implements AfterViewInit, OnDestroy {
    // enables the possibility to get access to the instance of DyamicFormComponent like this.form.valid
    // not safe to use before AfterViewInit hook
    @ViewChild(DynamicFormComponent) form: DynamicFormComponent;

    private changeSubscription: Subscription;

    // default css classes for form control/field groups
    classes:FieldClasses = {
      wrapper: 'form-group row',
      label: 'col-sm-2 col-form-label',
      inner: 'col-sm-10',
      control: 'form-control'
    };
    // configuration array form control/field groups
    config:FieldConfig[] = [
      {
        type: 'input',
        name: 'firstName',
        label: 'First name',
        placeholder: 'Enter your name',
        value: '',
        validation: [
          Validators.required,
          Validators.minLength(2), charValidator
        ],
        classes: {...this.classes}
      },
      {
        type: 'input',
        name: 'lastName',
        label: 'Last name',
        placeholder: 'Enter your last name',
        value: '',
        validation: [
          Validators.required,
          Validators.minLength(2), charValidator
        ],
        classes: {...this.classes}
      },
      {
        type: 'input',
        name: 'Username',
        label: 'Username',
        placeholder: 'Enter your username',
        value: '',
        validation: [
          Validators.required,
          Validators.minLength(2), charValidator
        ],
        classes: {...this.classes}
      },
      {
        type: 'passwordconfirm',
        name: 'passwordconfirmgroup',
        label: 'password confirmation',
        validation: [
          passwordConfirmValidator()
        ],
        controls: [
          { type: 'password', name: 'password', value: '', label: 'Password', placeholder: 'Enter password', validation: [Validators.required] },
          { type: 'password', name: 'passwordconfirm', value: '', label: 'Confirm password', placeholder: 'Confirm password', validation: [Validators.required] }
        ],
        classes: {
          ...this.classes,
          fieldset: 'form-group',
          wrapper: 'row',
          legend: 'col-form-label col-sm-2 pt-0',
          control: 'form-check-input',
          label: 'form-check-label'
        }
      },
      {
        type: 'select',
        name: 'role',
        label: 'Role',
        options: ['Admin', 'User'],
        defaultSelected: '0',
        placeholder: 'Select a role',
        // value: '2',
        validation: [
          Validators.required,
          selectValidator('0')  // use value from defaultSelected
        ],
        classes: {
          ...this.classes,
          control: 'form-control form-control-lg'
        }
      },
      {
        type: 'buttonbar',
        name: 'buttonbar_01',
        label: 'Buttonbar',
        classes: {
            ...this.classes,
            wrapper: this.classes.wrapper + ' justify-content-end'
        },
        buttons: [
          {
            type: 'button',
            name: 'buttonbar_reset',
            label: 'Reset',
            action: 'reset',
            classes: 'btn mr-3'
          },
          {
            type: 'button',
            name: 'buttonbar_submit',
            label: 'Submit',
            action: 'submit',
            classes: 'btn btn-primary mr-3',
            canDisable: true
          }
        ]
      },
    //   {
    //     type: 'textarea',
    //     name: 'comment',
    //     label: 'Your comment',
    //     placeholder: 'Enter your comment here.',
    //     readonly: '',
    //     value: 'Initial value',
    //     classes: {...this.classes}
    //   },
      {
        type: 'button',
        name: 'submit',
        label: 'Submit'
      },
    //   {
    //     type: 'inputgroup',
    //     name: 'inputgroup_01',
    //     label: 'Inputgroup',
    //     classes: {
    //       wrapper: 'form-row'
    //     },
    //     controls: [
    //       {
    //         type: 'input',
    //         name: 'zipcode',
    //         label: 'Zipcode',
    //         placeholder: 'Enter zipcode',
    //         validation: [
    //           Validators.required,
    //         ],
    //         classes: {
    //           wrapper: 'form-group',
    //           label: 'col-sm-2 col-form-label',
    //           inner: 'col-sm-10',
    //           control: 'form-control'
    //         }
    //       },
    //       {
    //         type: 'input',
    //         name: 'city',
    //         label: 'City',
    //         placeholder: 'Enter city',
    //         validation: [
    //           Validators.required,
    //         ],
    //         classes: {
    //           wrapper: 'form-group',
    //           label: 'col-sm-2 col-form-label',
    //           inner: 'col-sm-10',
    //           control: 'form-control'
    //         }
    //       }
    //     ]
    //   },
    //   {
    //     type: 'inputgroup',
    //     name: 'inputgroup_02',
    //     label: 'Inputgroup',
    //     classes: {
    //       wrapper: 'form-row'
    //     },
    //     controls: [
    //       {
    //         type: 'input',
    //         name: 'street',
    //         label: 'Street',
    //         placeholder: 'Enter street',
    //         validation: [
    //           Validators.required,
    //         ],
    //         classes: {
    //           wrapper: 'form-group',
    //           label: 'col-sm-2 col-form-label',
    //           inner: 'col-sm-10',
    //           control: 'form-control'
    //         }
    //       }
    //     ]
    //   },
    //   {
    //     type: 'controlgroup',
    //     name: 'controlgroup_01',
    //     label: 'Controlgroup',
    //     classes: {
    //       wrapper: 'form-row'
    //     },
    //     controls: [
    //       {
    //         type: 'input',
    //         name: 'controlgroup_control_01',
    //         label: 'controlgroup_control_01',
    //         placeholder: 'Enter controlgroup_control_01',
    //         validation: [
    //           Validators.required,
    //         ],
    //         classes: {
    //           wrapper: 'form-group',
    //           label: 'col-sm-2 col-form-label',
    //           inner: 'col-sm-10',
    //           control: 'form-control'
    //         }
    //       },
    //       {
    //         type: 'select',
    //         name: 'controlgroup_control_02',
    //         label: 'controlgroup_control_02',
    //         placeholder: 'Enter controlgroup_control_02',
    //         options: ['Hoasd', 'Hans Wuasd', 'Werner Winzig'],
    //         defaultSelected: '0',
    //         validation: [
    //           Validators.required,
    //           selectValidator('0')  // use value from defaultSelected
    //         ],
    //         classes: {
    //           wrapper: 'form-group',
    //           label: 'col-sm-2 col-form-label',
    //           inner: 'col-sm-10',
    //           control: 'form-control'
    //         }
    //       }
    //     ]
    //   },
    //   {
    //     type: 'radiogroup',
    //     name: 'gender',
    //     label: 'Gender',
    //     radios: [{label: 'female', value: '0'}, {label: 'male', value: '1'}],
    //     validation: [
    //       radioRequiredValidator()
    //     ],
    //     classes: {
    //       ...this.classes,
    //       fieldset: 'form-group',
    //       wrapper: 'row',
    //       legend: 'col-form-label col-sm-2 pt-0',
    //       control: 'form-check-input',
    //       label: 'form-check-label'
    //     }
    //   },
    //   {
    //     type: 'checkboxgroup',
    //     name: 'prg_language',
    //     label: 'programming language',
    //     controls: [
    //       { type: 'checkbox', name: 'prg_language', value: 'javascript', label: 'JavaScript', selected: false },
    //       { type: 'checkbox', name: 'prg_language', value: 'typescript', label: 'TypeScript', selected: false },
    //       { type: 'checkbox', name: 'prg_language', value: 'python', label: 'Python', selected: false }
    //     ],
    //     classes: {
    //       ...this.classes,
    //       fieldset: 'form-group',
    //       wrapper: 'row',
    //       legend: 'col-form-label col-sm-2 pt-0',
    //       control: 'form-check-input',
    //       label: 'form-check-label'
    //     }
    //   },
    //   {
    //     type: 'checkbox',
    //     name: 'rich',
    //     label: 'rich?',
    //     selected: false,
    //     // disabled: '',
    //     // value: false,
    //     classes: {
    //       inner: 'form-check',
    //       control: 'form-check-input',
    //       label: 'form-check-label'
    //     }
    //   }
    ];

    constructor(
      private changeDetectorRef: ChangeDetectorRef
    ) {}

    ngAfterViewInit() {
      let previousValid = this.form.valid;

      // subscribe to changes$ method from DynamicFormComponent
      this.changeSubscription = this.form.changes$.subscribe(() => {
        // if the valid value of the form changed
        if (previousValid !== this.form.valid) {
          // call setDisabled method from DynamicFormComponent to enable/disable the submit/buttonbar button
          this.form.setDisabled('submit', previousValid);
          this.form.setDisabled('buttonbar_01', previousValid);
          // set new status of form
          previousValid = this.form.valid;
        }
      });

      this.form.setDisabled('submit', true);
      this.form.setDisabled('buttonbar_01', true);
      // this.form.setValue('name', 'Quaese');

      // avoid 'ExpressionChangedAfterItHasBeenCheckedError' error
      // (more see: https://blog.angularindepth.com/everything-you-need-to-know-about-the-expressionchangedafterithasbeencheckederror-error-e3fd9ce7dbb4)
      this.changeDetectorRef.detectChanges();
    }

    hSubmit(formValues) {
      console.log('hSubmit (app.component): ', formValues, ' - ', this.form.valid);
    }

    ngOnDestroy() {
      this.changeSubscription.unsubscribe();
    }

}
