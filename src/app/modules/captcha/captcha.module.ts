import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CaptchaComponent } from './captcha.component';
import { CaptchaService } from './captcha.service';

@NgModule({
  declarations: [CaptchaComponent],
  exports: [CaptchaComponent],
  imports: [CommonModule],
  providers: [CaptchaService]
})
export class CaptchaModule {}
