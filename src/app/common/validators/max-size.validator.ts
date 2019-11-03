import { FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function MaxSize(size: number): ValidatorFn {
  return (formControl: FormControl): ValidationErrors | null => {
    const file: File = formControl.value;
    return file && file.size > size ? { maxSize: true } : null;
  };
}
