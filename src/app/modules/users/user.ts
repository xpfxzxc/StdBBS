import { Reply } from "../replies/reply";
import { Topic } from "../topics/topic";

export class User {
  avatar: string;
  createdAt: Number;
  email: string;
  id: number;
  introduction: string;
  name: string;
  notificationCount: number;
  replies?: Reply[];
  topics?: Topic[];
  updatedAt: number;

  constructor(init: User) {
    Object.assign(this, init);
  }

  isAuthorOf(entity: Topic | Reply): boolean {
    return this.id === entity.user.id;
  }
}
