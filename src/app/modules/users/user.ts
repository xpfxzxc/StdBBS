import { Topic } from "../topics/topic";

export class User {
  avatar: string;
  createdAt: Number;
  email: string;
  id: number;
  introduction: string;
  name: string;
  topics?: Topic[];
  updatedAt: number;

  constructor(init: Partial<User>) {
    Object.assign(this, init);
  }
}
