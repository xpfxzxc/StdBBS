import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export function MustMatch(controlName: string, matchingControlName: string): ValidatorFn {
  return (formGroup: FormGroup): ValidationErrors | null => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (!matchingControl.errors && control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    }

    return null;
  };
}
