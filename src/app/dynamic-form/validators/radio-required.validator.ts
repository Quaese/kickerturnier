import { AbstractControl, ValidatorFn } from "@angular/forms";

// wrapper to hand over arguments to validator function
export function radioRequiredValidator(): ValidatorFn{

  // returns the validator function
  return (control: AbstractControl): {[key: string]: any} | null => {
    const valid = control.value !== undefined;

    // return null for valid values, an error object otherwise
    return valid ? null : { radioSelected: { valid: false, value: control.value }};
  }
}
