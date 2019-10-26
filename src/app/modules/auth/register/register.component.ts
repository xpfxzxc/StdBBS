import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AlertService } from '../../alert/alert.service';
import { UserService } from '../../users/user.service';
import { MustMatch } from '../../../common/validators/must-match.validator';
import { CaptchaIsRightValidator } from '../../../common/validators/captcha-is-right.validator';
import { EmailIsAvailableValidator } from '../../../common/validators/email-is-available.validator';
import { TitleService } from '../../../services/title.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm = this.fb.group(
    {
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      email: ['', [Validators.required, Validators.email], [this.emailIsAvailableValidator.validate]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
      confirmPassword: ['', Validators.required],
      captcha: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
        [this.captchaIsRightValidator.validate]
      ]
    },
    {
      validators: [MustMatch('password', 'confirmPassword')]
    }
  );
  submitting = false;

  constructor(
    private readonly alertService: AlertService,
    private readonly captchaIsRightValidator: CaptchaIsRightValidator,
    private readonly emailIsAvailableValidator: EmailIsAvailableValidator,
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly titleService: TitleService,
    private readonly userService: UserService
  ) {}

  get f() {
    return this.registerForm.controls;
  }

  ngOnInit(): void {
    this.titleService.setTitle('用户注册');
  }

  onCaptchaRefresh() {
    this.registerForm.get('captcha').reset();
  }

  register() {
    this.submitting = true;

    this.userService.addUser(this.registerForm.value).subscribe(() => {
      this.submitting = false;

      this.alertService.success('注册成功！');
      this.router.navigateByUrl('/');
    });
  }
}
