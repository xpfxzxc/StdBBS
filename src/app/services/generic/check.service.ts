import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import APP from '../../common/constants/app.constant';
import { JsonResponse } from '../../common/modals/json-response';
import { User } from '../../modules/users/user';

const checkBaseUrl = `${APP.API_BASE_URL}/generic/check`;

@Injectable({
  providedIn: 'root'
})
export class CheckService {
  constructor(private readonly http: HttpClient) {}

  isCaptchaRight(captcha: string): Observable<boolean> {
    return this.http
      .get<JsonResponse>(`${checkBaseUrl}/captcha`, { params: { captcha } })
      .pipe(map(({ code }: JsonResponse) => code === 0));
  }

  isEmailAvailable(email: string): Observable<boolean> {
    return this.http
      .get<JsonResponse>(`${checkBaseUrl}/email`, { params: { email } })
      .pipe(map(({ code }: JsonResponse) => code === 0));
  }

  isLoggedIn(): Observable<User> {
    return this.http
      .get<JsonResponse>(`${checkBaseUrl}/login`)
      .pipe(map(res => (res.code === 0 ? new User(res.data['user']) : null)));
  }
}
