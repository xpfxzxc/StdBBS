import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { Observable } from "rxjs";
import { filter, map, pairwise, tap } from "rxjs/operators";

import { LoginBody } from "./interfaces/login-body.interface";
import { NotificationService } from "../notifications/notification.service";
import { User } from "../users/user";
import APP from "../../common/constants/app.constant";
import { JsonResponse } from "../../common/modals/json-response";
import { CheckService } from "../../services/generic/check.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  user: User; // BAD
  redirectUrl: string;

  constructor(
    private readonly checkService: CheckService,
    private readonly http: HttpClient,
    private readonly notificationService: NotificationService,
    private readonly router: Router
  ) {
    this.router.events
      .pipe(
        filter((event: any) => event instanceof NavigationEnd),
        pairwise()
      )
      .subscribe(
        (events: NavigationEnd[]) =>
          (this.redirectUrl = events[0].urlAfterRedirects)
      );

    this.notificationService.notification$.subscribe(() => {
      if (this.user) {
        this.user.notificationCount++;
      }
    });
  }

  isAuthenticated(): boolean {
    return !!this.user;
  }

  login(body: LoginBody): Observable<boolean> {
    return this.http.post<JsonResponse>(`${APP.API_BASE_URL}/login`, body).pipe(
      tap(res => {
        if (res.code === 0) {
          this.user = new User(res.data["user"]);
          this.socketsConnect();
        }
      }),
      map(({ code }: JsonResponse) => code === 0)
    );
  }

  logout(): Observable<void> {
    return this.http
      .post<JsonResponse>(`${APP.API_BASE_URL}/logout`, null)
      .pipe(
        tap(res => {
          if (res.code === 0) {
            this.reset();
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

        if (user) {
          this.socketsConnect();
        }
      })
    );
  }

  reset(): void {
    this.user = null;
    this.socketsDisconnect();
  }

  set(user: User) {
    if (user) {
      this.user = user;
      this.socketsConnect();
    } else {
      this.reset();
    }
  }

  // 不太合适在这里调用的代码，考虑到不会再扩展就不修改了
  private socketsConnect() {
    this.notificationService.connect();
  }

  private socketsDisconnect() {
    this.notificationService.disconnect();
  }
}
