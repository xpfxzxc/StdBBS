import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { User } from '../user';
import { UserService } from '../user.service';
import { AlertService } from '../../alert/alert.service';
import { AuthService } from '../../auth/auth.service';
import { Extension } from '../../../common/validators/extension.validator';
import { ImageValidator } from '../../../common/validators/image.validator';
import { MaxSize } from '../../../common/validators/max-size.validator';
import { MustMatch } from '../../../common/validators/must-match.validator';
import { TitleService } from '../../../services/title.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  submitting = false;
  user: User;
  userUpdateForm: FormGroup;

  constructor(
    private readonly alertService: AlertService,
    private readonly authService: AuthService,
    private readonly fb: FormBuilder,
    private readonly imageValidator: ImageValidator,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly titleService: TitleService,
    private readonly userService: UserService
  ) {}

  get f() {
    return this.userUpdateForm.controls;
  }

  ngOnInit() {
    this.route.data.subscribe((data: { user: User }) => {
      this.user = data.user;
      this.titleService.setTitle(`编辑 ${this.user.name} 的资料`);
      this.userUpdateForm = this.fb.group(
        {
          name: [this.user.name, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
          password: ['', [Validators.minLength(6), Validators.maxLength(16)]],
          confirmPassword: [''],
          introduction: [this.user.introduction, [Validators.maxLength(80)]],
          avatar: [
            null,
            [MaxSize(1e8), Extension(['png', 'jpg', 'gif', 'jpeg'])],
            [this.imageValidator.dimension({ minWidth: 200, minHeight: 200 })]
          ]
        },
        {
          validators: [MustMatch('password', 'confirmPassword')]
        }
      );
    });
  }

  onFileChange(event) {
    const avatar = (event.target as HTMLInputElement).files[0];
    this.userUpdateForm.patchValue({ avatar });
    this.userUpdateForm.get('avatar').markAsDirty();
  }

  update() {
    this.submitting = true;

    this.userService
      .updateUser(this.user.id, this.userUpdateForm.value)
      .pipe(finalize(() => (this.submitting = false)))
      .subscribe(successful => {
        if (successful) {
          this.alertService.success('更新个人资料成功！');
          this.authService.reload().subscribe();
          this.router.navigate(['/users', this.user.id]);
        }
      });
  }
}
