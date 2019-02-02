import { FieldClasses } from './field-classes.interface';
import { ValidatorFn } from "@angular/forms";


export interface FieldConfig {
    name: string;
    type: string;

    buttons?: any[];
    classes?: FieldClasses;
    controls?: FieldConfig[];
    defaultSelected?: string;
    disabled?: boolean;
    id?: string | number;
    label?: string;
    options?: string[];
    placeholder?: string;
    radios?: any[];
    readonly?: string;
    selected?: boolean;
    validation?: ValidatorFn[];
    value?: any;
}
