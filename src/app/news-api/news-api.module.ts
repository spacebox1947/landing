import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsApiArticleListComponent } from './news-api-article-list/news-api-article-list.component';
import { TrimNewsOutletNamePipe } from './trim-news-outlet-name.pipe';
import { SharedModule } from '../shared/shared.module';
import { NewsApiHeaderPipe } from './news-api-header.pipe';



@NgModule({
  declarations: [
    NewsApiArticleListComponent,
    TrimNewsOutletNamePipe,
    NewsApiHeaderPipe
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    NewsApiArticleListComponent
  ]
})
export class NewsApiModule { }
