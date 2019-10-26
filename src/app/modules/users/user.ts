export class User {
  createdAt: Number;
  email: string;
  id: number;
  name: string;

  constructor(init: Required<User>) {
    Object.assign(this, init);
  }
}
