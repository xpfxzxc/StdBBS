import { Injectable } from '@angular/core';
import { AsyncValidator, FormControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap, first } from 'rxjs/operators';

import { CheckService } from '../../services/generic/check.service';

@Injectable({ providedIn: 'root' })
export class EmailIsAvailableValidator implements AsyncValidator {
  constructor(private readonly checkService: CheckService) {}

  validate = (formControl: FormControl): Observable<ValidationErrors | null> => {
    return formControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((email: string) => this.checkService.isEmailAvailable(email)),
      map(available => (available ? null : { emailIsAvailable: true })),
      first()
    );
  };

  validateForNot = (formControl: FormControl): Observable<ValidationErrors | null> => {
    return this.validate(formControl).pipe(map(err => (err === null ? { emailIsAvailable: true } : null)));
  };
}
