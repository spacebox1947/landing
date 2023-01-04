import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HackerNewsArticleListComponent } from './hacker-news-article-list/hacker-news-article-list.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    HackerNewsArticleListComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    HackerNewsArticleListComponent
  ]
})
export class HackerNewsApiModule { }
