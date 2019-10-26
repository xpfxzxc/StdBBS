import { Injectable } from '@angular/core';
import { AsyncValidator, FormControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap, first } from 'rxjs/operators';

import { CaptchaService } from '../../modules/captcha/captcha.service';

@Injectable({ providedIn: 'root' })
export class CaptchaIsRightValidator implements AsyncValidator {
  constructor(private readonly captchaService: CaptchaService) {}

  validate = (formControl: FormControl): Observable<ValidationErrors | null> => {
    return formControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((captcha: string) => this.captchaService.verify(captcha)),
      map(right => (right ? null : { captchaIsRight: true })),
      first()
    );
  };
}
