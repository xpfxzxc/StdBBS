import { FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function Extension(ext: string[]): ValidatorFn {
  return (formControl: FormControl): ValidationErrors | null => {
    const file: File = formControl.value;

    if (!file) {
      return null;
    }

    const fileName = file.name.toLocaleLowerCase();
    const extname = fileName.slice(((fileName.lastIndexOf('.') - 1) >>> 0) + 2);
    return ext.includes(extname) ? null : { extension: true };
  };
}
