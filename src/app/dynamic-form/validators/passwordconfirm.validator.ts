import { FormGroup, ValidatorFn } from '@angular/forms';

// validator wrapper => returns the actual validation function
export function passwordConfirmValidator(): ValidatorFn {
  return (formGroup: FormGroup): {[key: string]: any} | null => {
    let message: string;

    // compare only the first two controls
    const keys = Object.keys(formGroup.controls).slice(0, 2);

    // if at least two controls exist => test if both values are identically
    if (keys.length > 1) {
      if (formGroup.controls[keys[0]].value !== formGroup.controls[keys[1]].value) {
        message = 'Passwords are not identically';
      }
    }

    return message ? {passwordConfirmError: {error: message}} : null;
  }
}
