import {
  Directive,
  ElementRef,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import * as EasyMDE from "easymde";
import get from "lodash-es/get";
import { MarkdownService } from "ngx-markdown";

import { JsonResponse } from "../../common/modals/json-response";

type CodeMirror = CodeMirror.Editor;

function isPattern(pattern: string | string[], value: string) {
  if (!pattern) {
    return false;
  }

  if (Array.isArray(pattern)) {
    return pattern.some(item => isPattern(item, value));
  }

  if (pattern === value) {
    return true;
  }

  const regExp = new RegExp(`^${pattern.replace("*", ".*")}`);
  return regExp.test(pattern);
}

@Directive({
  selector: "[appMarkdownEditor]"
})
export class MarkdownEditorDirective {
  @Input() uploadAllowedTypes: string | string[] = "*";
  @Input() beforeUpload: (file: File) => boolean | Promise<boolean>;
  @Input() uploadEndpoint = "";
  @Input() fileFieldName = "file";
  @Input() jsonName = "data.fileUrl";
  @Input() uploadProgressText = "**上传文件中...**";
  @Output() uploadError = new EventEmitter<{
    err?: HttpErrorResponse;
    res?: JsonResponse;
    file: File;
  }>();
  @Output() uploadSuccess = new EventEmitter<{
    res: JsonResponse;
    file: File;
  }>();
  @Output() valueChange = new EventEmitter<string>();

  private cm: CodeMirror;
  private editor: EasyMDE;

  constructor(
    private readonly http: HttpClient,
    private readonly markdownService: MarkdownService,
    private textarea: ElementRef
  ) {}

  ngAfterViewInit() {
    this.editor = new EasyMDE({
      element: this.textarea.nativeElement,
      spellChecker: false,
      tabSize: 2,
      previewRender: markdown => this.markdownService.compile(markdown)
    });

    this.cm = this.editor.codemirror;

    this.cm.on("change", this.onValueChange.bind(this));
    this.cm.on("drop", this.onDrop.bind(this));
    // @ts-ignore
    this.cm.on("paste", this.onPaste.bind(this));
  }

  ngOnDestroy(): void {
    this.cm.off("off", this.onValueChange);
    this.cm.off("drop", this.onDrop);
  }

  private insertUploadProgressText(file: File) {
    const { cm, uploadProgressText } = this;

    if (file.type.startsWith("image/")) {
      cm.replaceSelection(`![${uploadProgressText}]()`);
    } else {
      cm.replaceSelection(`[${uploadProgressText}]()`);
    }
  }

  private isFileAllowed(file: File) {
    const { uploadAllowedTypes } = this;
    return isPattern(uploadAllowedTypes, file.type);
  }

  private onDrop(cm: CodeMirror, event: DragEvent) {
    event.stopPropagation();
    event.preventDefault();
    this.uploadFiles(event.dataTransfer.files);
  }

  private onPaste(cm: CodeMirror, event: ClipboardEvent) {
    const clipboardData = event.clipboardData;

    if (clipboardData) {
      const items = clipboardData.items || clipboardData.files || [];
      const files = [];

      for (let i = 0; i < items.length; i++) {
        const item = items[i];

        if (item instanceof DataTransferItem) {
          const file = item.getAsFile();
          if (item.kind !== "string" && file) {
            files.push(file);
          }
        } else {
          files.push(item as File);
        }
      }

      if (files.length > 0) {
        event.stopPropagation();
        event.preventDefault();
      }

      this.uploadFiles(files as File[]);
    }
  }

  private onUploadError(err: HttpErrorResponse, res: JsonResponse, file: File) {
    const { uploadError } = this;

    this.removeUploadProgressText(file);

    uploadError.emit({
      err,
      res,
      file
    });
  }

  private onValueChange() {
    const { cm, valueChange } = this;
    valueChange.emit(cm.getValue());
  }

  private onUploadSuccess(res: JsonResponse, file: File) {
    const { jsonName, uploadSuccess } = this;

    const fileUrl = get(res, jsonName);
    this.replaceUploadProgressText(file, fileUrl);

    uploadSuccess.emit({ res, file });
  }

  private removeUploadProgressText(file: File) {
    const { cm, uploadProgressText } = this;

    const cursor = cm.getCursor();
    let textToRemove = `[${uploadProgressText}]()`;

    if (file.type.startsWith("image/")) {
      textToRemove = `![${uploadProgressText}]()`;
    }

    const text = cm.getValue().replace(textToRemove, "");
    cm.setValue(text);
    cm.setCursor(cursor);
    cm.focus();
  }

  private replaceUploadProgressText(file: File, fileUrl: string) {
    const { cm, uploadProgressText } = this;

    let newValue = `[${file.name}](${fileUrl})`;
    let textToReplace = `[${uploadProgressText}]()`;

    if (file.type.startsWith("image/")) {
      newValue = `![${file.name}](${fileUrl})`;
      textToReplace = `![${uploadProgressText}]()`;
    }

    const cursor = cm.getCursor();
    const text = cm.getValue().replace(textToReplace, newValue);
    cm.setValue(text);
    cursor.ch += newValue.length - uploadProgressText.length;
    cm.setCursor(cursor);
    cm.focus();
  }

  private upload(file: File) {
    const { uploadEndpoint, fileFieldName } = this;

    const formData = new FormData();
    formData.append(fileFieldName, file);

    this.http.post<JsonResponse>(uploadEndpoint, formData).subscribe(
      res => {
        if (res.code === 0) {
          this.onUploadSuccess(res, file);
        } else {
          this.onUploadError(null, res, file);
        }
      },
      err => {
        this.onUploadError(err, null, file);
      }
    );
  }

  private uploadFiles(fileList: FileList | File[]) {
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      if (this.isFileAllowed(file)) {
        const { beforeUpload } = this;

        if (!beforeUpload) {
          this.insertUploadProgressText(file);
          this.upload(file);
          continue;
        }

        const before = beforeUpload(file);
        if (before instanceof Promise) {
          before.then(() => {
            this.insertUploadProgressText(file);
            this.upload(file);
          });
        } else if (before !== false) {
          this.insertUploadProgressText(file);
          this.upload(file);
        }
      }
    }
  }
}
