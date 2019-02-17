import { AbstractControl } from "@angular/forms";

// validator function
export function charValidator(control: AbstractControl): {[key: string]: any} | null {
  const valid = /^[a-zA-Z]+$/.test(control.value);
  // const valid = /\w/.test(control.value);

  // return null for valid values, an error object otherwise
  return valid ? null : { invalidChar: { valid: false, value: control.value }};
}
