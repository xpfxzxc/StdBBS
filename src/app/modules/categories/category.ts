import { Topic } from "../topics/topic";

export class Category {
  description: string;
  id: number;
  name: string;
  postCount: number;
  topics?: Topic[];

  constructor(init: Category) {
    Object.assign(this, init);
  }
}
