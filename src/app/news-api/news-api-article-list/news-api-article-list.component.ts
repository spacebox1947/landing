import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { NewsApiService } from '../news-api.service';
import { Article } from '../news-api.service';

@Component({
  selector: 'app-news-api-article-list',
  templateUrl: './news-api-article-list.component.html',
  styleUrls: ['./news-api-article-list.component.css']
})
export class NewsApiArticleListComponent implements OnInit {
  articles!: Article[];

  constructor(private newsApiService: NewsApiService) {
    
    this.newsApiService.pagesOutput.subscribe((articles) => {
      console.log('Initializing newsApi');
      this.articles = articles;
      tap(articles => console.log(articles));
    });

    this.newsApiService.getPage(1);
  }

  ngOnInit(): void {

  }

}
