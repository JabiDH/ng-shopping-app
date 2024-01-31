import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ShopComponent } from './shop/shop.component';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared/modules/shared.module';
import { AuthInterceptor } from './auth/services/auth.interceptor';
import { LoggingInterceptor } from './shared/services/logging.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ShopComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule,
    SharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
