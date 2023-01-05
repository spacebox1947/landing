import { Component, OnInit, Input } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { NewsApiService } from '../news-api.service';
import { Article } from '../news-api.service';

@Component({
  selector: 'app-news-api-article-list',
  templateUrl: './news-api-article-list.component.html',
  styleUrls: ['./news-api-article-list.component.css']
})
export class NewsApiArticleListComponent implements OnInit {
  articles!: Article[];
  numberOfPages$!: Observable<number>;
  numberOfPages: number = 0;
  @Input() newPageNumber: number = 0;
  // modifiying defaul category pulls a new header from news-api-header-pipe
  category: string = 'general'
  country: string = 'us';

  constructor(private newsApiService: NewsApiService) {

    // gets value immediately, but must pass observable to paginator
    this.numberOfPages$ = this.newsApiService.numberOfPages;

    this.newsApiService.pagesOutput.subscribe((articles) => {
      console.log('Initializing newsApi');
      this.articles = articles;
      tap(articles => console.log(articles));
    });

    // gets correct value, but paginator is created AFTER numberOfPages
    // is updated by pagesOutput
    this.newsApiService.numberOfPages.subscribe((numberOfPages) => {
      this.numberOfPages = numberOfPages;
    })
    this.newsApiService.getPageAndCategory({category: this.category, page: 1});
  }

  ngOnInit(): void { }

  updatePageView(page: any) {
    this.newsApiService.getPageAndCategory({category: this.category, page});
  }

  updateCategory(category: string) {
    this.newsApiService.getPageAndCategory({category, page: 1});
  }

  updateCountry(country: string) {
    this.newsApiService.setCountry(country);
    this.newsApiService.getPageAndCategory({category: this.category, page: 1});
  }

}
