import { APP_INITIALIZER } from "@angular/core";

import { categoryProviderFactory } from "./category.initializer";
import { xsrfTokenProviderFactory } from "./xsrf-token.initializer";
import { CategoryService } from "../../modules/categories/category.service";
import { NotificationService } from "../../modules/notifications/notification.service";
import { XsrfTokenService } from "../../services/xsrf-token.service";

export const appInitializerProviders = [
  {
    provide: APP_INITIALIZER,
    useFactory: xsrfTokenProviderFactory,
    deps: [XsrfTokenService],
    multi: true
  },
  {
    provide: APP_INITIALIZER,
    useFactory: categoryProviderFactory,
    deps: [CategoryService],
    multi: true
  }
];
