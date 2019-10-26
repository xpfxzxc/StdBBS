import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';

import { CaptchaService } from './captcha.service';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html'
})
export class CaptchaComponent implements OnInit {
  @Input() height = 60;
  @Output() load = new EventEmitter();
  refreshUrl$ = new Subject();
  url: SafeUrl = '';
  @Input() width = 200;

  constructor(private readonly captchaService: CaptchaService) {}

  ngOnInit() {
    this.captchaService.fetchUrl().subscribe(url => (this.url = url));

    this.refreshUrl$
      .pipe(
        debounceTime(300),
        switchMap(() => this.captchaService.fetchUrl())
      )
      .subscribe(url => (this.url = url));
  }

  onLoad() {
    this.captchaService.releaseUrl(this.url);
    this.load.emit();
  }

  refresh() {
    this.refreshUrl$.next();
  }
}
