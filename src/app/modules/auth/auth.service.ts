import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, tap, pairwise } from 'rxjs/operators';

import { LoginBody } from './interfaces/login-body.interface';
import { User } from '../users/user';
import APP from '../../common/constants/app.constant';
import { JsonResponse } from '../../common/modals/json-response';
import { CheckService } from '../../services/generic/check.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  redirectUrl: string;

  constructor(
    private readonly checkService: CheckService,
    private readonly http: HttpClient,
    private readonly router: Router
  ) {
    this.router.events
      .pipe(
        filter((event: any) => event instanceof NavigationEnd),
        pairwise()
      )
      .subscribe((events: NavigationEnd[]) => (this.redirectUrl = events[0].urlAfterRedirects));
  }

  isAuthenticated(): boolean {
    return !!this.user;
  }

  login(body: LoginBody): Observable<boolean> {
    return this.http.post<JsonResponse>(`${APP.API_BASE_URL}/login`, body).pipe(
      tap(res => (res.code === 0 ? (this.user = new User(res.data['user'])) : this.user)),
      map(({ code }: JsonResponse) => code === 0)
    );
  }

  logout(): Observable<void> {
    return this.http.post<JsonResponse>(`${APP.API_BASE_URL}/logout`, null).pipe(
      tap(res => {
        if (res.code === 0) {
          this.user = null;
          this.router.navigateByUrl(this.router.url);
        }
      }),
      map(_ => undefined)
    );
  }

  reload(): Observable<void> {
    return this.checkService.isLoggedIn().pipe(
      map(user => {
        this.user = user;
      })
    );
  }
}
