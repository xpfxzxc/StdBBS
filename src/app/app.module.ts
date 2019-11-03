import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import APP from './common/constants/app.constant';
import { appInitializerProviders } from './common/app-initializers';
import { interceptorProviders } from './common/interceptors';
import { FooterComponent } from './layouts/footer/footer.component';
import { HeaderComponent } from './layouts/header/header.component';
import { AlertModule } from './modules/alert/alert.module';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, FooterComponent, HeaderComponent, HomeComponent],
  imports: [
    AlertModule.forRoot(),
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: `${APP.NAME}-XSRF-TOKEN`
    }),
    SharedModule
  ],
  providers: [appInitializerProviders, interceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {}
