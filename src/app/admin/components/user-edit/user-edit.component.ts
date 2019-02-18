import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { FieldClasses } from './../../../dynamic-form/models/field-classes.interface';
import { FieldConfig } from './../../../dynamic-form/models/field-config.interface';
import { Role } from './../../../models/role.models';

import { UserService } from './../../../services/user.service';

import { charValidator } from 'src/app/dynamic-form/validators/char.validator';
import { passwordConfirmValidator } from 'src/app/dynamic-form/validators/passwordconfirm.validator';

import { DynamicFormComponent } from './../../../dynamic-form/components/dynamic-form/dynamic-form.component';
import { selectValidator } from 'src/app/dynamic-form/validators/select.validator';


@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.less']
})
export class UserEditComponent implements OnInit, AfterViewInit {
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

    private userId: string;
    private config: FieldConfig[] = [
        {
          type: 'input',
          name: 'firstName',
          label: 'First name',
          placeholder: 'Enter your name',
        //   value: user.firstName,
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
        //   value: user.lastName,
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
        //   value: user.username,
          validation: [
            Validators.required,
            Validators.minLength(2), charValidator
          ],
          classes: {...this.classes}
        },
        // {
        //   type: 'passwordconfirm',
        //   name: 'passwordconfirmgroup',
        //   label: 'password confirmation',
        //   validation: [
        //     passwordConfirmValidator()
        //   ],
        //   controls: [
        //     { type: 'password',
        //       name: 'password',
        //       value: '',
        //       label: 'Password',
        //       placeholder: 'Enter password',
        //       validation: [Validators.required],
        //       classes: {
        //           ...this.classes,
        //           wrapper: 'form-input form-group d-flex w-100'
        //       }
        //     },
        //     { type: 'password',
        //       name: 'passwordconfirm',
        //       value: '',
        //       label: 'Confirm password',
        //       placeholder: 'Confirm password',
        //       validation: [Validators.required],
        //       classes: {
        //           ...this.classes,
        //           wrapper: 'form-input form-group d-flex w-100'
        //       }
        //     }
        //   ],
        //   classes: {
        //     ...this.classes,
        //     fieldset: 'form-group',
        //     wrapper: 'row',
        //     legend: 'col-form-label col-sm-2 pt-0',
        //     control: 'form-check-input',
        //     label: 'form-check-label'
        //   }
        // },
        {
          type: 'select',
          name: 'role',
          label: 'Role',
          options: this.userRoles,
          defaultSelected: '0',
          placeholder: 'Select a role',
        //   value: this.userRoles.indexOf(user.role).toString(),
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
        private route: ActivatedRoute,
        private changeDetectorRef: ChangeDetectorRef,
        private userService: UserService
    ) {}

    ngOnInit() {
      this.userId = this.route.snapshot.paramMap.get('id') || null;

    }

    ngAfterViewInit() {
      let previousValid = this.form.valid;

      if (this.userId) {
          this.userService.getById(this.userId)
              // .pipe(first())
              .subscribe(user => {
                  this.config.forEach(field => {
                      if (user[field.name]) {
                          console.log(user[field.name]);
                          field.value = user[field.name];
                          this.form.setValue(field.name, user[field.name]);
                      }
                  });

                  console.log(this.config);
              })
      }

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
}
