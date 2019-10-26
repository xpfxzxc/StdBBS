import { AlertType } from './alert.enum';

export class Alert {
  alertId: string;
  autoHide: boolean;
  delay: number;
  dismissible: boolean;
  message: string;
  type: AlertType;

  constructor(init?: Partial<Alert>) {
    Object.assign(this, init);
  }
}
