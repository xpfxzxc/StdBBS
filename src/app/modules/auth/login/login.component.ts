import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { AuthService } from '../auth.service';
import { CaptchaComponent } from '../../captcha/captcha.component';
import { TitleService } from '../../../services/title.service';
import { CaptchaIsRightValidator } from '../../../common/validators/captcha-is-right.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  failed = false;
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    captcha: ['', [Validators.required], [this.captchaIsRightValidator.validate]]
  });
  submitting = false;

  @ViewChild(CaptchaComponent, { static: false }) private captchaComponent: CaptchaComponent;

  constructor(
    private readonly authService: AuthService,
    private readonly captchaIsRightValidator: CaptchaIsRightValidator,
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly titleService: TitleService
  ) {}

  get f() {
    return this.loginForm.controls;
  }

  login() {
    this.failed = false;
    this.submitting = true;

    this.authService
      .login(this.loginForm.value)
      .pipe(finalize(() => (this.submitting = false)))
      .subscribe(successful => {
        if (successful) {
          const redirect = this.authService.redirectUrl;
          this.router.navigateByUrl(!redirect || redirect === '/login' ? '/' : redirect);
        } else {
          this.failed = true;
          this.captchaComponent.refresh();
        }
      });
  }

  ngOnInit() {
    this.titleService.setTitle('用户登录');
  }

  onCaptchaRefresh() {
    this.loginForm.get('captcha').reset();
  }
}
