import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MomentModule } from "ngx-moment";
import { MarkdownModule } from "ngx-markdown";

import { CaptchaModule } from "../modules/captcha/captcha.module";
import { MarkdownEditorDirective } from "./directives/markdown-editor.directive";

@NgModule({
  declarations: [MarkdownEditorDirective],
  exports: [
    CaptchaModule,
    MarkdownEditorDirective,
    MarkdownModule,
    MomentModule,
    NgbModule,
    ReactiveFormsModule
  ]
})
export class SharedModule {}
