import { Topic } from "../topics/topic";
import { User } from "../users/user";

export class Reply {
  content: string;
  createdAt: number;
  id: number;
  topic?: Topic;
  updatedAt: number;
  user?: User;

  constructor(init: Reply) {
    Object.assign(this, init);
  }
}
