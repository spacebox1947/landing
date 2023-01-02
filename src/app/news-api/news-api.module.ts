import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsApiArticleListComponent } from './news-api-article-list/news-api-article-list.component';
import { TrimNewsOutletNamePipe } from './trim-news-outlet-name.pipe';



@NgModule({
  declarations: [
    NewsApiArticleListComponent,
    TrimNewsOutletNamePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NewsApiArticleListComponent
  ]
})
export class NewsApiModule { }
