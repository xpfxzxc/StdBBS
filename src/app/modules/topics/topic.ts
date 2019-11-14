import { Category } from "../categories/category";
import { User } from "../users/user";

export class Topic {
  body: string;
  category?: Category;
  createdAt: number;
  id: number;
  lastReplyUser?: User;
  order: number;
  replyCount: number;
  title: string;
  updatedAt: number;
  user?: User;
  viewCount: number;

  constructor(init: Partial<Topic>) {
    Object.assign(this, init);
  }
}
