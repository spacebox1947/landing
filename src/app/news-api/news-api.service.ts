import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { tap, map, switchMap, catchError, retry } from 'rxjs';
import { NotificationsService } from '../notifications/notifications.service';
import { NewsQueryOptions } from './news-query-options';

interface NewsApiResponse {
  //status: string
  totalResults: number
  articles: Article[];
}

export interface Article {
  title: string;
  url: string
  //description: string
  //author: string
  //urlToIMage: string;
  //publishedAt: string;
  //content: string //unformatted content of article. 200 chars max
  source: {
    name: string;
  }
}

export interface NewsApiRequest {
  page: number
  category: string
}

/* export interface Category {
  category: 'general' | 'technology' | 'science' | 'health' | 'buisiness' | 'entertainment' | 'sports';
} */

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {
  // params for NewsApi Query
  private url = 'https://newsapi.org/v2/top-headlines';
  private pageSize = 10;
  private apiKey = '48f7e48e35d84066a5b503bb87cadae3';
  newsOptions = new NewsQueryOptions;
  country: string;

  // Subject/Observable for what page of articles to get and how many are available
  private pagesInput!: Subject<NewsApiRequest>
  pagesOutput!: Observable<Article[]>;
  numberOfPages!: Subject<number>;

  constructor(
    private http: HttpClient,
    private notificationsService: NotificationsService) { 
      this.country = this.newsOptions.defaultCountryIso;
      this.initialize();
  }

  getPageAndCategory(request: NewsApiRequest) {
    //console.log(request);
    this.pagesInput.next(request);
  }

  setCountry(country: string) {
    this.country = country;
  }

  initialize() {
    this.numberOfPages = new Subject();
    this.pagesInput = new Subject();
    this.pagesOutput = this.pagesInput.pipe(
      retry(1),
      // receive some page stuff
      //map((page) => {
      map((request) => {
        return new HttpParams()
          .set('country', this.country)
          //.set('page', String(page))
          .set('page', String(request.page))
          .set('pageSize', String(this.pageSize))
          .set('category', request.category)
          .set('apiKey', this.apiKey);
      }),
      switchMap((params) => {
        return this.http.get<NewsApiResponse>(this.url, { params: params });
      }),
      tap((response) => {
        const totalPages = Math.ceil(response.totalResults / this.pageSize);
        this.numberOfPages.next(totalPages);
        // annoyingly, this vvv fires every time the paginator is used
        this.notificationsService.addSuccess(`Gathered ${this.pageSize} articles out of ${response.totalResults}`);
      }),
      catchError((err) => {
        this.notificationsService.addError(`Error collecting NewsApi News articles: ${err}`);
        return throwError(() => new Error(err)) ;
      }),
      map((response) => response.articles)
    );
  }
}