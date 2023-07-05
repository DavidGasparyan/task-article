import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterOutlet } from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule} from "@angular/forms";
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import { SignupComponent } from './signup/signup.component';
import { StatisticsComponent } from './statistics/statistics.component';
import {ArticleListModule} from "./article-list/article-list.module";
import {ArticleModule} from "./article/article.module";
import {HighchartsChartModule} from "highcharts-angular";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    StatisticsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterOutlet,
    HttpClientModule,
    ReactiveFormsModule,
    ArticleListModule,
    ArticleModule,
    HighchartsChartModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
