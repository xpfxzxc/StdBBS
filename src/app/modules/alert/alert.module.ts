import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { Router } from '@angular/router';

import { AlertComponent } from './alert.component';
import { AlertService } from './alert.service';
import { AlertConfig } from './alert-config.interface';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [AlertComponent],
  exports: [AlertComponent],
  imports: [CommonModule, SharedModule]
})
export class AlertModule {
  static forRoot(config?: AlertConfig): ModuleWithProviders {
    return {
      ngModule: AlertModule,
      providers: [
        {
          provide: AlertService,
          useFactory: (router: Router) => new AlertService(config, router),
          deps: [Router]
        }
      ]
    };
  }
}
