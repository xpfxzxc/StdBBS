import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { Notification } from "./notification";
import { NotificationsSocket } from "./notifications.socket";
import APP from "../../common/constants/app.constant";
import { JsonResponse } from "../../common/modals/json-response";
import { Pagination } from "../../common/modals/pagination";

declare interface FetchUserNotifications {
  page?: number;
}

@Injectable({
  providedIn: "root"
})
export class NotificationService {
  notification$ = this.socket.fromEvent<Notification>("create");

  connect(): void {
    this.socket.connect();
  }

  constructor(
    private readonly http: HttpClient,
    private socket: NotificationsSocket
  ) {}

  disconnect(): void {
    this.socket.disconnect();
  }

  fetchUserNotifications(
    userId: number,
    params: FetchUserNotifications = { page: 1 }
  ): Observable<Pagination<Notification>> {
    const { page } = params;
    return this.http
      .get<JsonResponse>(`${APP.API_BASE_URL}/users/${userId}/notifications`, {
        params: {
          page: `${page}`
        }
      })
      .pipe(
        map(res => (res.code === 0 ? res.data["userNotifications"] : null))
      );
  }
}
