import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot
} from "@angular/router";
import { EMPTY, Observable, of } from "rxjs";
import { mergeMap, take } from "rxjs/operators";

import { Notification } from "../notification";
import { NotificationService } from "../notification.service";
import { AuthService } from "../../auth/auth.service";
import { Pagination } from "../../../common/modals/pagination";

@Injectable()
export class NotificationsResolverService
  implements Resolve<Pagination<Notification>> {
  constructor(
    private readonly authService: AuthService,
    private readonly notificationService: NotificationService,
    private readonly router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Pagination<Notification>> | Observable<never> {
    const userId = this.authService.user.id;
    const page = +route.queryParamMap.get("page") || 1;
    route.data = { ...route.data, page };

    if (page < 0) {
      this.router.navigateByUrl("/notifications");
      return EMPTY;
    }

    return this.notificationService
      .fetchUserNotifications(userId, { page })
      .pipe(
        take(1),
        mergeMap(pagination => {
          if (pagination.itemCount > 0 || page === 1) {
            return of(pagination);
          } else {
            this.router.navigateByUrl("/notifications");
            return EMPTY;
          }
        })
      );
  }
}
