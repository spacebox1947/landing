import { Component, OnInit, Input } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { NewsApiService } from '../news-api.service';
import { Article } from '../news-api.service';
import { NewsApiRequest } from '../news-api.service';

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
  @Input() category: string = 'general';

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

    // this will accept a event$ from paginator to change pages
    //this.newsApiService.getPage(1);
    /* let newsCategory;
    try {
      this.assertValidCategory(this.category);
      newsCategory = this.category;
      this.newsApiService.getPageAndCategory({category: newsCategory, page: 1});
    } catch (err) {
      console.log(err);
    } */
    this.newsApiService.getPageAndCategory({category: this.category, page: 1});
  }

  ngOnInit(): void { }

  updatePageView(page: any) {
    //console.log(page);
    //this.newsApiService.getPage(page);
    this.newsApiService.getPageAndCategory({category: this.category, page});
  }

  assertValidCategory(category: string) {
    switch(category) {
      case 'general':
      case 'entertainment':
      case 'technology':
      case 'buisiness':
      case 'sports':
      case 'health':
      case 'science':
        return true;
      default:
        throw new Error(`Invalid Category value: ${category}`);
    }
  }

}
