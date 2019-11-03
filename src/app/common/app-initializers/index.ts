import { APP_INITIALIZER } from '@angular/core';

import { xsrfTokenProviderFactory } from './xsrf-token.initializer';
import { XsrfTokenService } from '../../services/xsrf-token.service';

export const appInitializerProviders = [
  { provide: APP_INITIALIZER, useFactory: xsrfTokenProviderFactory, deps: [XsrfTokenService], multi: true }
];
