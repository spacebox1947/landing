import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { WeatherModule } from './weather/weather.module';
import { NotificationsModule } from './notifications/notifications.module';
import { NewsApiModule } from './news-api/news-api.module';
//import { HackerNewsApiModule } from './hacker-news-api/hacker-news-api.module';
import { TechNewsApiModule } from './tech-news-api/tech-news-api.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    WeatherModule,
    NotificationsModule,
    NewsApiModule,
    //HackerNewsApiModule,
    TechNewsApiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
