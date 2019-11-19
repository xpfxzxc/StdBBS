import { Category } from "../categories/category";
import { Reply } from "../replies/reply";
import { User } from "../users/user";

export class Topic {
  body: string;
  category?: Category;
  createdAt: number;
  id: number;
  lastReplyUser?: User;
  order: number;
  replies: Reply[];
  replyCount: number;
  title: string;
  updatedAt: number;
  user?: User;
  viewCount: number;

  constructor(init: Topic) {
    Object.assign(this, init);
  }
}
