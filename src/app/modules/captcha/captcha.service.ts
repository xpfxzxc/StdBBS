import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import APP from '../../common/constants/app.constant';
import { JsonResponse } from '../../common/modals/json-response';
import { CheckService } from '../../services/generic/check.service';

@Injectable()
export class CaptchaService {
  constructor(
    private readonly checkService: CheckService,
    private readonly http: HttpClient,
    private readonly sanitizer: DomSanitizer
  ) {}

  fetchUrl(): Observable<SafeUrl> {
    return this.http.get<JsonResponse>(`${APP.API_BASE_URL}/captcha`).pipe(
      map(res => {
        const svg = res.data['captcha'];
        const blob = new Blob([svg], { type: 'image/svg+xml' });
        return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
      })
    );
  }

  releaseUrl(url: SafeUrl): void {
    URL.revokeObjectURL(url as string);
  }

  verify(captcha: string): Observable<boolean> {
    return this.checkService.isCaptchaRight(captcha);
  }
}
