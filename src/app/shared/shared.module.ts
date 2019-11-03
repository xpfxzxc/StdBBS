import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MomentModule } from 'ngx-moment';

import { CaptchaModule } from '../modules/captcha/captcha.module';

@NgModule({
  declarations: [],
  exports: [CaptchaModule, MomentModule, NgbModule, ReactiveFormsModule]
})
export class SharedModule {}
