import { Component, Input, OnInit } from '@angular/core';
import { Subscription, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Alert } from './alert';
import { AlertType } from './alert.enum';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html'
})
export class AlertComponent implements OnInit {
  @Input() alertId: string;
  alerts: Alert[] = [];

  private subscription: Subscription;

  constructor(private alertService: AlertService) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.subscription = this.alertService.onAlert(this.alertId).subscribe(alert => {
      if (alert.message) {
        this.alerts.push(alert);

        if (alert.autoHide) {
          of(alert)
            .pipe(delay(alert.delay))
            .subscribe(alert => this.remove(alert));
        }
      } else {
        this.alerts = [];
      }
    });
  }

  onClose(alert: Alert) {
    this.remove(alert);
  }

  type(alert: Alert) {
    switch (alert.type) {
      case AlertType.Danger:
        return 'danger';
      case AlertType.Info:
        return 'info';
      case AlertType.Primary:
        return 'primary';
      case AlertType.Success:
        return 'success';
      case AlertType.Warning:
        return 'warning';
    }
  }

  private remove(alert: Alert) {
    this.alerts = this.alerts.filter(x => x !== alert);
  }
}
