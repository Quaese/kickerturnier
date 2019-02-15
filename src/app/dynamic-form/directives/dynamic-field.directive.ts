import { Directive, Input, ViewContainerRef, OnInit, ComponentRef, ComponentFactoryResolver, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field } from './../models/field.interface';
import { FieldConfig } from './../models/field-config.interface';

import { FormButtonComponent } from './../components/form-button/form-button.component';
import { FormButtonbarComponent } from './../components/form-buttonbar/form-buttonbar.component';
import { FormCheckboxComponent } from './../components/form-checkbox/form-checkbox.component';
import { FormCheckboxGroupComponent } from './../components/form-checkboxgroup/form-checkboxgroup.component';
import { FormControlgroupComponent } from './../components/form-controlgroup/form-controlgroup.component';
import { FormInputComponent } from './../components/form-input/form-input.component';
import { FormInputgroupComponent } from './../components/form-inputgroup/form-inputgroup.component';
import { FormPasswordconfirmComponent } from './../components/form-passwordconfirm/form-passwordconfirm.component';
import { FormRadiogroupComponent } from './../components/form-radiogroup/form-radiogroup.component';
import { FormSelectComponent } from './../components/form-select/form-select.component';
import { FormTextareaComponent } from './../components/form-textarea/form-textarea.component';

// map components to form field types
const components = {
  button: FormButtonComponent,
  buttonbar: FormButtonbarComponent,
  checkbox: FormCheckboxComponent,
  checkboxgroup: FormCheckboxGroupComponent,
  controlgroup: FormControlgroupComponent,
  input: FormInputComponent,
  inputgroup: FormInputgroupComponent,
  passwordconfirm: FormPasswordconfirmComponent,
  radiogroup: FormRadiogroupComponent,
  select: FormSelectComponent,
  textarea: FormTextareaComponent
};

@Directive({
  // attribute directive (structural directive)
  selector: '[dynamicField]'
})
export class DynamicFieldDirective implements OnInit, OnChanges {
  @Input()
  config: FieldConfig;

  @Input()
  group: FormGroup;

  private component: ComponentRef<Field>;

  constructor(
    // resolves the component factories that Angular has created for each component
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit() {
    // if type is not defined in components object
    if (!components[this.config.type]) {
      const supportedTypes = Object.keys(components).join(', ');
      throw new Error(
        `Trying to us an unsupported type (${this.config.type}).
        Supported types: ${supportedTypes}`
      );
    }

    // get the factory for the component
    const factory = this.componentFactoryResolver.resolveComponentFactory<Field>(components[this.config.type]);

    // create component by using ViewContainerRef to create the component
    this.component = this.viewContainerRef.createComponent(factory);
    // pass the needed properties to the component (using .instance property)
    this.component.instance.config = this.config;
    this.component.instance.group = this.group;
  }

  ngOnChanges() {
    if (this.component) {
      this.component.instance.config = this.config;
      this.component.instance.group = this.group;
    }
  }
}
