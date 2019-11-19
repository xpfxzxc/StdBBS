import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

import { Reply } from "../reply";
import { ReplyService } from "../reply.service";
import { AuthService } from "../../auth/auth.service";
import { Topic } from "../../topics/topic";

@Component({
  selector: "app-reply-list",
  templateUrl: "./reply-list.component.html",
  styleUrls: ["./reply-list.component.scss"]
})
export class ReplyListComponent implements OnInit {
  @Output() deleteReply = new EventEmitter<Reply>();
  @Input() replies: Reply[] = [];
  @Input() topic: Topic;

  constructor(
    public readonly authService: AuthService,
    private readonly replyService: ReplyService
  ) {}

  delete(reply: Reply) {
    if (confirm("确定要删除此评论？")) {
      this.replyService.deleteTopic(reply.id).subscribe(successful => {
        if (successful) {
          this.replies = this.replies.filter(x => x.id !== reply.id);
          this.deleteReply.emit(reply);
        }
      });
    }
  }

  ngOnInit() {}
}
