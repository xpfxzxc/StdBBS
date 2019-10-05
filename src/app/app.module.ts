import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { HeaderComponent } from './layouts/header/header.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, FooterComponent, HeaderComponent],
  imports: [AppRoutingModule, BrowserModule, SharedModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
