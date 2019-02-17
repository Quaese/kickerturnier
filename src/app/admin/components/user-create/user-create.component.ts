import { Component, ChangeDetectorRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { UserService } from './../../../services/user.service';

import { FieldConfig } from '../../../dynamic-form/models/field-config.interface';
import { FieldClasses } from '../../../dynamic-form/models/field-classes.interface';
import { Role } from './../../../models/role.models';

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

    // user role array from Role enum
    private userRoles = Object.keys(Role).map(role => Role[role]);
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
        // value: 'hans',
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
        // value: 'wuasd',
        validation: [
          Validators.required,
          Validators.minLength(2), charValidator
        ],
        classes: {...this.classes}
      },
      {
        type: 'input',
        name: 'username',
        label: 'Username',
        placeholder: 'Enter your username',
        // value: 'hawu',
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
          { type: 'password',
            name: 'password',
            // value: '123456',
            label: 'Password',
            placeholder: 'Enter password',
            validation: [Validators.required],
            classes: {
                ...this.classes,
                wrapper: 'form-input form-group d-flex w-100'
            }
          },
          { type: 'password',
            name: 'passwordconfirm',
            // value: '123456',
            label: 'Confirm password',
            placeholder: 'Confirm password',
            validation: [Validators.required],
            classes: {
                ...this.classes,
                wrapper: 'form-input form-group d-flex w-100'
            }
          }
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
        options: this.userRoles,
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
      {
        type: 'button',
        name: 'submit',
        label: 'Submit'
      }
    ];

    constructor(
      private changeDetectorRef: ChangeDetectorRef,
      private userService: UserService
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

      this.form.setDisabled('submit', !this.form.valid);
      this.form.setDisabled('buttonbar_01', !this.form.valid);
      // this.form.setValue('name', 'Quaese');

      // avoid 'ExpressionChangedAfterItHasBeenCheckedError' error
      // (more see: https://blog.angularindepth.com/everything-you-need-to-know-about-the-expressionchangedafterithasbeencheckederror-error-e3fd9ce7dbb4)
      this.changeDetectorRef.detectChanges();
    }

    hSubmit(formValues) {
      // console.log('hSubmit (app.component): ', formValues, ' - ', this.form.valid, {...formValues, password: formValues.passwordconfirmgroup.password, role: this.userRoles[Number(formValues.role)-1]});
      this.userService.createUser({
        ...formValues,
        password: formValues.passwordconfirmgroup.password,
        role: this.userRoles[Number(formValues.role)-1]
      })
      .pipe(first())
      .subscribe(
        data => {
          console.log('user-create: ToDo - give feedback for data.success true/false', data);
        },
        err => {
          console.log(err);
        }
      );
    }

    ngOnDestroy() {
      this.changeSubscription.unsubscribe();
    }

}
