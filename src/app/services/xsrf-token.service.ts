import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import APP from '../common/constants/app.constant';
import { JsonResponse } from '../common/modals/json-response';

@Injectable({
  providedIn: 'root'
})
export class XsrfTokenService {
  constructor(private readonly http: HttpClient) {}

  fetch(): Observable<void> {
    return this.http.get<JsonResponse>(`${APP.API_BASE_URL}/xsrftoken`).pipe(map(_ => undefined));
  }
}
