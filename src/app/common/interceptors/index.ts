import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ForbiddenInterceptor } from './forbidden.interceptor';
import { HttpErrorInterceptor } from './http-error.interceptor';
import { XsrfTokenInterceptor } from './xsrf-token.interceptor';

export const interceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ForbiddenInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: XsrfTokenInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
];
