export interface AddUserBody {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly confirmPassword: string;
  readonly captcha: string;
}
