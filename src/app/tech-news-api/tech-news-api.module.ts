import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechNewsArticleListComponent } from './tech-news-article-list/tech-news-article-list.component';



@NgModule({
  declarations: [
    TechNewsArticleListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TechNewsArticleListComponent
  ]
})
export class TechNewsApiModule { }
