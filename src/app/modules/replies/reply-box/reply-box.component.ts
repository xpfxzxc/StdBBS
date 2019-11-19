import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { finalize } from "rxjs/operators";

import { Reply } from "../reply";
import { ReplyService } from "../reply.service";

@Component({
  selector: "app-reply-box",
  templateUrl: "./reply-box.component.html",
  styleUrls: ["./reply-box.component.scss"]
})
export class ReplyBoxComponent implements OnInit {
  @Output() addReply = new EventEmitter<Reply>();
  replyForm = this.fb.group({
    content: ["", [Validators.required, Validators.minLength(2)]]
  });
  submitting = false;
  @Input() topicId: number;

  constructor(
    private readonly fb: FormBuilder,
    private readonly replyService: ReplyService
  ) {}

  get f() {
    return this.replyForm.controls;
  }

  ngOnInit() {}

  onSubmit() {
    if (!this.topicId) {
      return;
    }

    this.submitting = true;

    this.replyService
      .addReply({ ...this.replyForm.value, topicId: this.topicId })
      .pipe(finalize(() => (this.submitting = false)))
      .subscribe(reply => {
        if (reply) {
          this.replyForm.reset();
          this.addReply.emit(reply);
        }
      });
  }
}
