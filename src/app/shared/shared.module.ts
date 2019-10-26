import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CaptchaModule } from '../modules/captcha/captcha.module';

@NgModule({
  declarations: [],
  exports: [NgbModule, ReactiveFormsModule, CaptchaModule]
})
export class SharedModule {}
