export class User {
  avatar: string;
  createdAt: Number;
  email: string;
  id: number;
  introduction: string;
  name: string;

  constructor(init: Required<User>) {
    Object.assign(this, init);
  }
}
