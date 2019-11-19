import { Injectable } from "@angular/core";
import { Router, NavigationStart } from "@angular/router";
import { Subject } from "rxjs";
import { filter } from "rxjs/operators";

import { Alert } from "./alert";
import { AlertType } from "./alert.enum";
import { AlertOptions } from "./alert-options.interface";
import { AlertConfig } from "./alert-config.interface";

@Injectable()
export class AlertService {
  private mode: string;
  private keepAfterRouteChange = false;
  private subject = new Subject<Alert>();

  clear(alertId?: string) {
    this.subject.next(new Alert({ alertId }));
  }

  constructor(private config: AlertConfig = {}, private router: Router) {
    this.mode = config.mode || "flash";

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterRouteChange) {
          if (this.mode === "flash") {
            this.keepAfterRouteChange = false;
          }
        } else {
          this.clear(); // 无法自动清除带有 alertId 的 alerts
        }
      }
    });
  }

  danger(message: string, options?: AlertOptions) {
    this.alert(this.makeAlert(message, AlertType.Danger, options));
  }

  info(message: string, options?: AlertOptions) {
    this.alert(this.makeAlert(message, AlertType.Info, options));
  }

  onAlert(alertId?: string) {
    return this.subject.asObservable().pipe(filter(x => x.alertId === alertId));
  }

  primary(message: string, options?: AlertOptions) {
    this.alert(this.makeAlert(message, AlertType.Primary, options));
  }

  setMode(newMode: "clear" | "flash" | "keep") {
    this.mode = newMode;
  }

  setKeepAfterRouteChange(newKeepAfterRouteChange: boolean) {
    this.keepAfterRouteChange = newKeepAfterRouteChange;
  }

  success(message: string, options?: AlertOptions) {
    this.alert(this.makeAlert(message, AlertType.Success, options));
  }

  warning(message: string, options?: AlertOptions) {
    this.alert(this.makeAlert(message, AlertType.Warning, options));
  }

  private alert(alert: Alert) {
    this.keepAfterRouteChange = this.mode !== "clear";
    this.subject.next(alert);
  }

  private makeAlert = (
    message: string,
    type: AlertType,
    options: AlertOptions = {}
  ) => {
    return new Alert({
      message,
      type,
      alertId: options.alertId,
      autoHide: options.autoHide || this.config.autoHide || false,
      delay: options.delay || this.config.delay || 3000,
      dismissible: options.dismissible || this.config.dismissible || true
    });
  };
}
