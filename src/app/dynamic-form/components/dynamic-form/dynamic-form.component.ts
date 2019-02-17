import { FormArray } from '@angular/forms';
/*
 * Call with a component, e.g.:
 *
 *
 *  import { Component, ViewChild, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
 *  import { Validators } from '@angular/forms';
 *  import { Subscription } from 'rxjs';
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
 *        value: 'Hoasd',
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
 *        value: 'Initial value',
 *        classes: {...this.classes}
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
 *        radios: [{label: 'female', value: '0'}, {label: 'male', value: '1'}],
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
 *      // subscribe to changes$ method from DynamicFormComponent
 *      this.changeSubscription = this.form.changes$.subscribe(() => {
 *        // if the valid value of the form changed
 *        if (previousValid !== this.form.valid) {
 *          // call setDisabled method from DynamicFormComponent to enable/disable the submit/buttonbar button
 *          this.form.setDisabled('submit', previousValid);
 *          this.form.setDisabled('buttonbar_01', previousValid);
 *          // set new status of form
 *          previousValid = this.form.valid;
 *        }
 *      });
 *
 *      this.form.setDisabled('submit', true);
 *      this.form.setDisabled('buttonbar_01', true);
 *      // this.form.setValue('name', 'Quaese');
 *
 *      // avoid 'ExpressionChangedAfterItHasBeenCheckedError' error
 *      // (more see: https://blog.angularindepth.com/everything-you-need-to-know-about-the-expressionchangedafterithasbeencheckederror-error-e3fd9ce7dbb4)
 *      this.changeDetectorRef.detectChanges();
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

  private controlConfig = {
    notControlled: ['button', 'buttonbar'],
    controlGroups: ['inputgroup', 'controlgroup'],
    formArrays: ['checkboxgroup'],
    formGroups: ['passwordconfirm']
  };

  // Getter
  get controls() {
    let controlgroups = [],
      controls = this.config.filter((item) => {
        // get controlgroups
        if ((new RegExp(`^${this.controlConfig.controlGroups.join('|')}$`)).test(item.type)) {
          // add controls to controlgroup array
          controlgroups = controlgroups.concat(item.controls);
          // do not add them to controls array
          return false;
        }

        return !(new RegExp(`^${this.controlConfig.notControlled.join('|')}$`)).test(item.type);
      });

    // if controlgroups array is not empty => add content to controls array
    if (controlgroups.length) {
      controls = controls.concat(controlgroups);
    }

    return controls;
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
      // get all controls from the config array (except buttons)
      const controls = Object.keys(this.form.controls);
      // get array containing control names only
      const configControls = this.controls.map((item) => item.name);

      console.log('controls (dynamic-form.component): ', controls);
      console.log('configControls (dynamic-form.component): ', configControls);

      controls
        .filter((control) => !configControls.includes(control))     // get all controls which are not included in the config
        .forEach((control) => this.form.removeControl(control));    // remove all not included controls from form

      configControls
        .filter((control) => !controls.includes(control))
        .forEach((name) => {
          const config = this.config.find((control) => control.name === name);
          this.form.addControl(name, this.createControl(config));
        });
    }
  }

  createGroup(): FormGroup {
    const group = this.fb.group({});

    this.controls.forEach(control => {
      // if new control contains/manages an FormArray
      if ( (new RegExp(`^${this.controlConfig.formArrays.join('|')}$`)).test(control.type)) {
        // add FormArray to control
        group.addControl(control.name, this.fb.array(control.controls.map(item => this.fb.control(item.selected || false))));
        // push control name to array (only once)
        this.formArrayControls[control.name] = control;
      }
      // if new control contains/manages a formGroup (e.g. Password Confirmation)
      else if ( (new RegExp(`^${this.controlConfig.formGroups.join('|')}$`)).test(control.type)) {
        // add form group to control
        group.addControl(control.name, this.fb.group({}, {validator: control.validation}));

        // loop over controls that should be controlled by the form group
        control.controls.forEach((subControl) => {
          (group.get(control.name) as FormGroup).addControl(
            subControl.name,
            this.createControl(subControl)
          );
        });
      } else {
        group.addControl(control.name, this.createControl(control));
      }
    });

    return group;
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

  setValue(name: string, value: any) {
    this.form.controls[name].setValue(value, {emitEvent: true});
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
