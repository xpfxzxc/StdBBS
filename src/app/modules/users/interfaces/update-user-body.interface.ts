export interface UpdateUserBody {
  readonly name: string;
  readonly password: string;
  readonly confirmPassword: string;
  readonly introduction: string;
  readonly avatar: File;
}
