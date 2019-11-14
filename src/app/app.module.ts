import { HttpClientModule, HttpClientXsrfModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { sanitize } from "dompurify";
import { CookieService } from "ngx-cookie-service";
import { MarkdownModule, MarkedOptions } from "ngx-markdown";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import APP from "./common/constants/app.constant";
import { appInitializerProviders } from "./common/app-initializers";
import { interceptorProviders } from "./common/interceptors";
import { FooterComponent } from "./layouts/footer/footer.component";
import { HeaderComponent } from "./layouts/header/header.component";
import { AlertModule } from "./modules/alert/alert.module";
import { SharedModule } from "./shared/shared.module";

declare var Prism: {
  languages;
  highlight(text, grammar, language);
};

@NgModule({
  declarations: [AppComponent, FooterComponent, HeaderComponent],
  imports: [
    AlertModule.forRoot(),
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: `${APP.NAME}-XSRF-TOKEN`
    }),
    MarkdownModule.forRoot({
      markedOptions: {
        provide: MarkedOptions,
        useValue: {
          headerIds: false,
          gfm: true,
          breaks: true,
          highlight(code, lang) {
            if (lang) {
              const language = lang.toLowerCase();
              const grammar = Prism.languages[language];
              if (grammar) {
                return Prism.highlight(code, grammar, language);
              }
            }

            return code;
          },
          sanitize: true,
          sanitizer: html => sanitize(html)
        }
      }
    }),
    SharedModule
  ],
  providers: [appInitializerProviders, CookieService, interceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {}
