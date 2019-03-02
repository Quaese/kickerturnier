import { FormArray } from '@angular/forms';
/*
 * Call with a component, e.g.:
 *
 *  import { Component, ViewChild, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
 *  import { Validators } from '@angular/forms';
 *  import { Subscription, of } from 'rxjs';
 *  import { delay } from 'rxjs/operators';
 *
 *  import { FieldConfig } from './dynamic-form/models/field-config.interface';
 *  import { FieldClasses } from './dynamic-form/models/field-classes.interface';
 *
 *  import { charValidator } from './dynamic-form/validators/char.validator';
 *  import { selectValidator } from './dynamic-form/validators/select.validator';
 *  import { radioRequiredValidator } from './dynamic-form/validators/radio-required.validator';
 *
 *  import { DynamicFormComponent } from './dynamic-form/components/dynamic-form/dynamic-form.component';
 *  import { passwordConfirmValidator } from './dynamic-form/validators/passwordconfirm.validator';
 *
 *  @Component({
 *    selector: 'app-root',
 *    templateUrl: './app.component.html',
 *    styleUrls: ['./app.component.less']
 *  })
 *  export class AppComponent implements AfterViewInit, OnDestroy {
 *    // enables the possibility to get access to the instance of DyamicFormComponent like this.form.valid
 *    // not safe to use before AfterViewInit hook
 *    @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
 *
 *    private changeSubscription: Subscription;
 *
 *    // default css classes for form control/field groups
 *    classes:FieldClasses = {
 *      wrapper: 'form-group row',
 *      label: 'col-sm-2 col-form-label',
 *      inner: 'col-sm-10',
 *      control: 'form-control'
 *    };
 *    // configuration array form control/field groups
 *    config:FieldConfig[] = [
 *      {
 *        type: 'input',
 *        name: 'name',
 *        label: 'Full name',
 *        placeholder: 'Enter your name',
 *        // disabled: '',
 *        //value: 'Hoasd',
 *        validation: [
 *          Validators.required,
 *          Validators.minLength(2), charValidator
 *        ],
 *        classes: {...this.classes}
 *      },
 *      {
 *        type: 'select',
 *        name: 'nick',
 *        label: 'Favorite nick name',
 *        options: ['Hoasd', 'Hans Wuasd', 'Werner Winzig'],
 *        defaultSelected: '0',
 *        placeholder: 'Select an option',
 *        // value: '2',
 *        validation: [
 *          Validators.required,
 *          selectValidator('0')  // use value from defaultSelected
 *        ],
 *        classes: {
 *          ...this.classes,
 *          control: 'form-control form-control-lg'
 *        }
 *      },
 *      {
 *        type: 'textarea',
 *        name: 'comment',
 *        label: 'Your comment',
 *        placeholder: 'Enter your comment here.',
 *        readonly: '',
 *        // value: 'Initial value',
 *        classes: {...this.classes}
 *      },
 *      {
 *        type: 'inputgroup',
 *        name: 'inputgroup_01',
 *        label: 'Inputgroup',
 *        classes: {
 *          wrapper: 'form-row'
 *        },
 *        controls: [
 *          {
 *            type: 'input',
 *            name: 'zipcode',
 *            label: 'Zipcode',
 *            placeholder: 'Enter zipcode',
 *            validation: [
 *              Validators.required,
 *            ],
 *            classes: {
 *              wrapper: 'form-group',
 *              label: 'col-sm-2 col-form-label',
 *              inner: 'col-sm-10',
 *              control: 'form-control'
 *            }
 *          },
 *          {
 *            type: 'input',
 *            name: 'city',
 *            label: 'City',
 *            placeholder: 'Enter city',
 *            validation: [
 *              Validators.required,
 *            ],
 *            classes: {
 *              wrapper: 'form-group',
 *              label: 'col-sm-2 col-form-label',
 *              inner: 'col-sm-10',
 *              control: 'form-control'
 *            }
 *          }
 *        ]
 *      },
 *      {
 *        type: 'inputgroup',
 *        name: 'inputgroup_02',
 *        label: 'Inputgroup',
 *        classes: {
 *          wrapper: 'form-row'
 *        },
 *        controls: [
 *          {
 *            type: 'input',
 *            name: 'street',
 *            label: 'Street',
 *            placeholder: 'Enter street',
 *            validation: [
 *              Validators.required,
 *            ],
 *            classes: {
 *              wrapper: 'form-group',
 *              label: 'col-sm-2 col-form-label',
 *              inner: 'col-sm-10',
 *              control: 'form-control'
 *            }
 *          }
 *        ]
 *      },
 *      {
 *        type: 'controlgroup',
 *        name: 'controlgroup_01',
 *        label: 'Controlgroup',
 *        classes: {
 *          wrapper: 'form-row'
 *        },
 *        controls: [
 *          {
 *            type: 'input',
 *            name: 'controlgroup_control_01',
 *            label: 'controlgroup_control_01 - text field',
 *            placeholder: 'Enter controlgroup_control_01',
 *            validation: [
 *              Validators.required,
 *            ],
 *            classes: {
 *              wrapper: 'form-group',
 *              label: 'col-sm-2 col-form-label',
 *              inner: 'col-sm-10',
 *              control: 'form-control'
 *            }
 *          },
 *          {
 *            type: 'input',
 *            name: 'controlgroup_control_02',
 *            label: 'controlgroup_control_02 - date field',
 *            placeholder: 'Enter Date',
 *            inputtype: 'date',
 *            validation: [
 *            ],
 *            classes: {
 *              wrapper: 'form-group',
 *              label: 'col-sm-2 col-form-label',
 *              inner: 'col-sm-10',
 *              control: 'form-control'
 *            }
 *          },
 *          {
 *            type: 'select',
 *            name: 'controlgroup_control_03',
 *            label: 'controlgroup_control_03 - Select',
 *            placeholder: 'Enter controlgroup_control_03',
 *            options: ['Hoasd', 'Hans Wuasd', 'Werner Winzig'],
 *            defaultSelected: '0',
 *            validation: [
 *              Validators.required,
 *              selectValidator('0')  // use value from defaultSelected
 *            ],
 *            classes: {
 *              wrapper: 'form-group',
 *              label: 'col-sm-2 col-form-label',
 *              inner: 'col-sm-10',
 *              control: 'form-control'
 *            }
 *          },
 *          {
 *            type: 'input',
 *            name: 'controlgroup_control_04',
 *            label: 'controlgroup_control_04 - hidden field',
 *            inputtype: 'hidden',
 *            value: 'hidden value'
 *          }
 *        ]
 *      },
 *      {
 *        type: 'radiogroup',
 *        name: 'gender',
 *        label: 'Gender',
 *        radios: [{type: 'radio', label: 'female', value: '0'}, {type: 'radio', label: 'male', value: '1'}],
 *        validation: [
 *          radioRequiredValidator()
 *        ],
 *        classes: {
 *          ...this.classes,
 *          fieldset: 'form-group',
 *          wrapper: 'row',
 *          legend: 'col-form-label col-sm-2 pt-0',
 *          control: 'form-check-input',
 *          label: 'form-check-label'
 *        }
 *      },
 *      {
 *        type: 'checkboxgroup',
 *        name: 'prg_language',
 *        label: 'programming language',
 *        controls: [
 *          { type: 'checkbox', name: 'prg_language', value: 'javascript', label: 'JavaScript', selected: false },
 *          { type: 'checkbox', name: 'prg_language', value: 'typescript', label: 'TypeScript', selected: false },
 *          { type: 'checkbox', name: 'prg_language', value: 'python', label: 'Python', selected: false }
 *        ],
 *        classes: {
 *          ...this.classes,
 *          fieldset: 'form-group',
 *          wrapper: 'row',
 *          legend: 'col-form-label col-sm-2 pt-0',
 *          control: 'form-check-input',
 *          label: 'form-check-label'
 *        }
 *      },
 *      {
 *        type: 'checkbox',
 *        name: 'rich',
 *        label: 'rich?',
 *        selected: false,
 *        // disabled: '',
 *        // value: false,
 *        classes: {
 *          inner: 'form-check',
 *          control: 'form-check-input',
 *          label: 'form-check-label'
 *        }
 *      },
 *      {
 *        type: 'passwordconfirm',
 *        name: 'passwordconfirmgroup',
 *        label: 'password confirmation',
 *        validation: [
 *          passwordConfirmValidator()
 *        ],
 *        controls: [
 *          { type: 'password', name: 'password', value: '', label: 'Password', placeholder: 'Enter password', validation: [Validators.required] },
 *          { type: 'password', name: 'passwordconfirm', value: '', label: 'Confirm password', placeholder: 'Confirm password', validation: [Validators.required] }
 *        ],
 *        classes: {
 *          ...this.classes,
 *          fieldset: 'form-group',
 *          wrapper: 'row',
 *          legend: 'col-form-label col-sm-2 pt-0',
 *          control: 'form-check-input',
 *          label: 'form-check-label'
 *        }
 *      },
 *      {
 *        type: 'button',
 *        name: 'submit',
 *        label: 'Submit'
 *      },
 *      {
 *        type: 'buttonbar',
 *        name: 'buttonbar_01',
 *        label: 'Buttonbar',
 *        buttons: [
 *          {
 *            type: 'button',
 *            name: 'buttonbar_reset',
 *            label: 'Reset',
 *            action: 'reset',
 *            classes: 'btn'
 *          },
 *          {
 *            type: 'button',
 *            name: 'buttonbar_submit',
 *            label: 'Submit',
 *            action: 'submit',
 *            classes: 'btn btn-primary',
 *            canDisable: true
 *          }
 *        ]
 *      }
 *    ];
 *
 *    constructor(
 *      private changeDetectorRef: ChangeDetectorRef
 *    ) {}
 *
 *    ngAfterViewInit() {
 *      let previousValid = this.form.valid;
 *
 *      // method to simulate update of values (e.g. after getting data from http request)
 *      this.updateFormValuesWithObservable();
 *
 *      // subscribe to changes$ method from DynamicFormComponent
 *      this.changeSubscription = this.form.changes$.subscribe(() => {
 *        // if the valid value of the form changed
 *        if (previousValid !== this.form.valid) {
 *          // call setDisabled method from DynamicFormComponent to enable/disable the submit/buttonbar button
 *          this.setDisabled(previousValid);
 *          // set new status of form
 *          previousValid = this.form.valid;
 *        }
 *      });
 *
 *      this.setDisabled(!this.form.valid);
 *      // this.form.setValue('name', 'Quaese');
 *
 *      // avoid 'ExpressionChangedAfterItHasBeenCheckedError' error
 *      // (more see: https://blog.angularindepth.com/everything-you-need-to-know-about-the-expressionchangedafterithasbeencheckederror-error-e3fd9ce7dbb4)
 *      this.changeDetectorRef.detectChanges();
 *    }
 *
 *    updateFormValuesWithObservable() {
 *      const subscribe = of(null).pipe(
 *        delay(1000)
 *      )
 *      .subscribe(() => {
 *        let newValuesConfig: FieldConfig[];
 *
 *        newValuesConfig = [
 *          {
 *            type: 'input',
 *            name: 'name',
 *            label: 'Full name',
 *            placeholder: 'Enter your name',
 *            // disabled: '',
 *            value: 'Hoasd',
 *            validation: [
 *              Validators.required,
 *              Validators.minLength(2), charValidator
 *            ],
 *            classes: {...this.classes}
 *          },
 *          {
 *            type: 'select',
 *            name: 'nick',
 *            label: 'Favorite nick name',
 *            options: ['Hoasd', 'Hans Wuasd', 'Werner Winzig'],
 *            defaultSelected: '0',
 *            placeholder: 'Select an option',
 *            value: '1',
 *            validation: [
 *              Validators.required,
 *              selectValidator('0')  // use value from defaultSelected
 *            ],
 *            classes: {
 *              ...this.classes,
 *              control: 'form-control form-control-lg'
 *            }
 *          },
 *          {
 *            type: 'textarea',
 *            name: 'comment',
 *            label: 'Your comment',
 *            placeholder: 'Enter your comment here.',
 *            readonly: '',
 *            value: 'Updated value',
 *            classes: {...this.classes}
 *          },
 *          {
 *            type: 'inputgroup',
 *            name: 'inputgroup_01',
 *            label: 'Inputgroup',
 *            classes: {
 *              wrapper: 'form-row'
 *            },
 *            controls: [
 *              {
 *                type: 'input',
 *                name: 'zipcode',
 *                label: 'Zipcode',
 *                placeholder: 'Enter zipcode',
 *                value: '12345',
 *                validation: [
 *                  Validators.required,
 *                ],
 *                classes: {
 *                  wrapper: 'form-group',
 *                  label: 'col-sm-2 col-form-label',
 *                  inner: 'col-sm-10',
 *                  control: 'form-control'
 *                }
 *              },
 *              {
 *                type: 'input',
 *                name: 'city',
 *                label: 'City',
 *                placeholder: 'Enter city',
 *                value: 'Irgendwo',
 *                validation: [
 *                  Validators.required,
 *                ],
 *                classes: {
 *                  wrapper: 'form-group',
 *                  label: 'col-sm-2 col-form-label',
 *                  inner: 'col-sm-10',
 *                  control: 'form-control'
 *                }
 *              }
 *            ]
 *          },
 *          {
 *            type: 'inputgroup',
 *            name: 'inputgroup_02',
 *            label: 'Inputgroup',
 *            classes: {
 *              wrapper: 'form-row'
 *            },
 *            controls: [
 *              {
 *                type: 'input',
 *                name: 'street',
 *                label: 'Street',
 *                placeholder: 'Enter street',
 *                value: 'Am Hang',
 *                validation: [
 *                  Validators.required,
 *                ],
 *                classes: {
 *                  wrapper: 'form-group',
 *                  label: 'col-sm-2 col-form-label',
 *                  inner: 'col-sm-10',
 *                  control: 'form-control'
 *                }
 *              }
 *            ]
 *          },
 *          {
 *            type: 'controlgroup',
 *            name: 'controlgroup_01',
 *            label: 'Controlgroup',
 *            classes: {
 *              wrapper: 'form-row'
 *            },
 *            controls: [
 *              {
 *                type: 'input',
 *                name: 'controlgroup_control_01',
 *                label: 'controlgroup_control_01 - text field',
 *                placeholder: 'Enter controlgroup_control_01',
 *                value: '... toll...',
 *                validation: [
 *                  Validators.required,
 *                ],
 *                classes: {
 *                  wrapper: 'form-group',
 *                  label: 'col-sm-2 col-form-label',
 *                  inner: 'col-sm-10',
 *                  control: 'form-control'
 *                }
 *              },
 *              {
 *                type: 'input',
 *                name: 'controlgroup_control_02',
 *                label: 'controlgroup_control_02 - date field',
 *                placeholder: 'Enter Date',
 *                inputtype: 'date',
 *                validation: [
 *                ],
 *                classes: {
 *                  wrapper: 'form-group',
 *                  label: 'col-sm-2 col-form-label',
 *                  inner: 'col-sm-10',
 *                  control: 'form-control'
 *                }
 *              },
 *              {
 *                type: 'select',
 *                name: 'controlgroup_control_03',
 *                label: 'controlgroup_control_03 - Select',
 *                placeholder: 'Enter controlgroup_control_03',
 *                value: '1',
 *                options: ['Hoasd', 'Hans Wuasd', 'Werner Winzig'],
 *                defaultSelected: '0',
 *                validation: [
 *                  Validators.required,
 *                  selectValidator('0')  // use value from defaultSelected
 *                ],
 *                classes: {
 *                  wrapper: 'form-group',
 *                  label: 'col-sm-2 col-form-label',
 *                  inner: 'col-sm-10',
 *                  control: 'form-control'
 *                }
 *              },
 *              {
 *                type: 'input',
 *                name: 'controlgroup_control_04',
 *                label: 'controlgroup_control_04 - hidden field',
 *                inputtype: 'hidden',
 *                value: 'hidden value'
 *              }
 *            ]
 *          },
 *          {
 *            type: 'radiogroup',
 *            name: 'gender',
 *            label: 'Gender',
 *            radios: [{type: 'radio', label: 'female', value: '0', selected: true}, {type: 'radio', label: 'male', value: '1'}],
 *            validation: [
 *              radioRequiredValidator()
 *            ],
 *            classes: {
 *              ...this.classes,
 *              fieldset: 'form-group',
 *              wrapper: 'row',
 *              legend: 'col-form-label col-sm-2 pt-0',
 *              control: 'form-check-input',
 *              label: 'form-check-label'
 *            }
 *          },
 *          {
 *            type: 'checkboxgroup',
 *            name: 'prg_language',
 *            label: 'programming language',
 *            controls: [
 *              { type: 'checkbox', name: 'prg_language', value: 'javascript', label: 'JavaScript', selected: true },
 *              { type: 'checkbox', name: 'prg_language', value: 'typescript', label: 'TypeScript', selected: false },
 *              { type: 'checkbox', name: 'prg_language', value: 'python', label: 'Python', selected: true }
 *            ],
 *            classes: {
 *              ...this.classes,
 *              fieldset: 'form-group',
 *              wrapper: 'row',
 *              legend: 'col-form-label col-sm-2 pt-0',
 *              control: 'form-check-input',
 *              label: 'form-check-label'
 *            }
 *          },
 *          {
 *            type: 'checkbox',
 *            name: 'rich',
 *            label: 'rich?',
 *            selected: true,
 *            // disabled: '',
 *            // value: false,
 *            classes: {
 *              inner: 'form-check',
 *              control: 'form-check-input',
 *              label: 'form-check-label'
 *            }
 *          },
 *          {
 *            type: 'passwordconfirm',
 *            name: 'passwordconfirmgroup',
 *            label: 'password confirmation',
 *            validation: [
 *              passwordConfirmValidator()
 *            ],
 *            controls: [
 *              { type: 'password', name: 'password', value: 'asdf', label: 'Password', placeholder: 'Enter password', validation: [Validators.required] },
 *              { type: 'password', name: 'passwordconfirm', value: 'asdf', label: 'Confirm password', placeholder: 'Confirm password', validation: [Validators.required] }
 *            ],
 *            classes: {
 *              ...this.classes,
 *              fieldset: 'form-group',
 *              wrapper: 'row',
 *              legend: 'col-form-label col-sm-2 pt-0',
 *              control: 'form-check-input',
 *              label: 'form-check-label'
 *            }
 *          },
 *          {
 *            type: 'button',
 *            name: 'submit',
 *            // disabled: !this.form.valid,
 *            label: 'Submit'
 *          },
 *          {
 *            type: 'buttonbar',
 *            name: 'buttonbar_01',
 *            label: 'Buttonbar',
 *            buttons: [
 *              {
 *                type: 'button',
 *                name: 'buttonbar_reset',
 *                label: 'Reset',
 *                action: 'reset',
 *                classes: 'btn'
 *              },
 *              {
 *                type: 'button',
 *                name: 'buttonbar_submit',
 *                label: 'Submit',
 *                action: 'submit',
 *                classes: 'btn btn-primary',
 *                // disabled: !this.form.valid,
 *                canDisable: true
 *              }
 *            ]
 *          }
 *        ];
 *
 *        // set values from config to form controls
 *        this.form.setValues(newValuesConfig);
 *      });
 *    }
 *
 *    setDisabled(disabled) {
 *      this.form.setDisabled('submit', disabled);
 *      this.form.setDisabled('buttonbar_01', disabled);
 *    }
 *
 *    hSubmit(formValues) {
 *      console.log('hSubmit (app.component): ', formValues, ' - ', this.form.valid);
 *    }
 *
 *    ngOnDestroy() {
 *      this.changeSubscription.unsubscribe();
 *    }
 *  }
 *
 */


import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { FieldConfig } from './../../models/field-config.interface';
import md5 from '../../shared/md5';


@Component({
  exportAs: 'dynamicForm',
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.less']
})
export class DynamicFormComponent implements OnInit, OnChanges {
  @Input()
  config: FieldConfig[] = [];

  @Output()
  submit: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;

  private formArrayControls = {};

  // object to hold control references as value to their names as keys {controlname: controlreference, ...}
  private groupControls = {};

  private controlConfig = {
    notControlled: ['button', 'buttonbar'],
    formArrays: ['checkboxgroup'],
    formGroups: ['inputgroup', 'passwordconfirm', 'controlgroup']
  };

  // Getter
  get controls() {
    return this.config.filter((item) => !(new RegExp(`^${this.controlConfig.notControlled.join('|')}$`)).test(item.type));
  }
  get valid() { return this.form.valid }
  get value() { return this.form.value }
  get changes$() { return this.form.valueChanges }  // returns an Observable

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    console.log('dynamic-form.component (OnInit): md5("hello") = ', md5('hello'));
    this.form = this.createGroup();
  }

  ngOnChanges() {
    if (this.form) {
      // get all controls from the form group object
      const formControls = Object.keys(this.form.controls);
      // get array containing control names only
      const configControls = this.controls.map((item) => item.name);

      console.log('formControls (dynamic-form.component): ', formControls);
      console.log('configControls (dynamic-form.component): ', JSON.stringify(configControls));

      // this.controls.forEach(control => {
      //   console.log(control.name, ': ', this.form.get(control.name) instanceof FormGroup, this.form.get(control.name) instanceof FormArray);
      // })

      formControls
      .filter((control) => !configControls.includes(control))     // get all controls which are not included in the config
      .forEach((control) => {
        this.form.removeControl(control);    // remove all not included controls from form
        delete this.groupControls[control];  // remove control name from group
      });

      configControls
        .filter((control) => !formControls.includes(control))
        .forEach((name) => {
          const singleControl = this.config.find((control) => control.name === name);
          // prepare control from config and add to form group object
          singleControl && this.prepareControl(singleControl, this.form);
        });
    }
  }

  createGroup(): FormGroup {
    const group = this.fb.group({});

    this.controls.forEach(control => {
      this.prepareControl(control, group);
    });

    return group;
  }

  prepareControl(control: FieldConfig, group: FormGroup) {
    // if new control contains/manages an FormArray
    if ( (new RegExp(`^${this.controlConfig.formArrays.join('|')}$`)).test(control.type)) {
      // add FormArray to control
      group.addControl(control.name, this.fb.array(control.controls.map(item => this.fb.control(item.selected || false))));
      // push control name to array (only once)
      this.formArrayControls[control.name] = control;
      // add control reference with its name to control object
      this.groupControls[control.name] = group.get(control.name);
    }
    // if new control contains/manages a formGroup (e.g. Password Confirmation)
    else if ( (new RegExp(`^${this.controlConfig.formGroups.join('|')}$`)).test(control.type)) {
      // add form group to control
      group.addControl(control.name, this.fb.group({}, {validator: control.validation}));
      // add control reference with its name to control object
      this.groupControls[control.name] = group.get(control.name);

      // loop over controls that should be controlled by the form group
      control.controls.forEach((subControl) => {
        (group.get(control.name) as FormGroup).addControl(
          subControl.name,
          this.createControl(subControl)
        );
        // add control reference with its name to control object
        this.groupControls[subControl.name] = group.get(control.name).get(subControl.name);
      });
    } else {
      group.addControl(control.name, this.createControl(control));
      // add control reference with its name to control object
      this.groupControls[control.name] = group.get(control.name);
    }
  }

  createControl(config: FieldConfig) {
    const {disabled, validation, value} = config;

    return this.fb.control({disabled, value}, validation);
  }

  setDisabled(name: string, disable: boolean) {
    // if a form control exists corresponding to the argument *name*
    if (this.form.controls[name]) {
      const method = disable ? 'disable' : 'enable';
      // execute needed method (.disable() or .enable())
      this.form.controls[name][method]();
      return;
    }

    // loop over config array
    this.config = this.config.map((item) => {
      // if an element exists corresponding to the argument *name*
      if (item.name === name) {
        // set disabled property for this element to the config array
        item.disabled = disable;
      }
      return item;
    });
  }

  setValue(name: string, value: any, options?: any) {
    // if a control exists
    if (this.groupControls[name]) {
      // if current control is no FormArray => set value
      if (!(this.groupControls[name] instanceof FormArray)) {
        this.groupControls[name].setValue(value, {emitEvent: true});
        // if current control is inside a FormArray
      } else if (options && options.index !== undefined && options.type === 'checkbox') {
        this.groupControls[name].controls[options.index].setValue(value, {emitEvent: true});
      }
    }
  }

  setValues(newValuesConfig: FieldConfig[]) {
    // loop over controls in newValuesConfig
    newValuesConfig.forEach(control => {
      // default: control has a value
      if (control.value !== undefined) {
        this.setValue(control.name, control.value);
      // radio buttons
      } else if (control.radios) {
        const radio = control.radios.filter(innerControl => (innerControl.selected !== undefined && innerControl.selected));

        radio.length && this.setValue(control.name, radio[0].value);
      }

      if (control.controls) {
        control.controls.forEach((innerControl, index) => {
          // if innerControl
          if (innerControl.name !== undefined && innerControl.value !== undefined) {
            this.setValue(
              innerControl.name,
              innerControl.selected !== undefined ? innerControl.selected : innerControl.value,
              {
                index: index,
                type: innerControl.type
              }
            );
          }
        });
      }
    });
  }

  mapFormArrays() {
    const instance = this;
    let formArrayValues = {};

    // loop over all controls containing a FormArray
    Object.keys(instance.formArrayControls).forEach(controlName => {
      // add corresponding control from config controls-array
      formArrayValues[controlName] = instance.value[controlName].map((selected: boolean, i: number) => {
        return {
          ...instance.formArrayControls[controlName].controls[i],
          selected
        }
      });
    });

    return formArrayValues;
  }

  hSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    // create new return object
    const formValue = Object.assign({}, this.value, this.mapFormArrays());

    // trigger/emit event for parent component (hand over value via getter)
    this.submit.emit(formValue);
  }
}
