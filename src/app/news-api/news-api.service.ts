import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap, map, switchMap } from 'rxjs';

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

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {
  // params for NewsApi Query
  private url = 'https://newsapi.org/v2/top-headlines';
  private pageSize = 10;
  private apiKey = '48f7e48e35d84066a5b503bb87cadae3';
  private country = 'us';

  // Subject/Observable for what page of articles to get and how many are available
  private pagesInput: Subject<number>;
  pagesOutput: Observable<Article[]>;
  numberOfPages: Subject<number>;

  constructor(private http: HttpClient) { 
    this.numberOfPages = new Subject();

    this.pagesInput = new Subject();
    this.pagesOutput = this.pagesInput.pipe(
      // receive some page stuff
      map((page) => {
        return new HttpParams()
          .set('country', this.country)
          .set('page', String(page))
          .set('pageSize', String(this.pageSize))
          //.set('category', 'technology')
          .set('apiKey', this.apiKey);
      }),
      switchMap((params) => {
        return this.http.get<NewsApiResponse>(this.url, { params: params });
      }),
      tap((response) => {
        console.log(response);
        const totalPages = Math.ceil(response.totalResults / this.pageSize);
        this.numberOfPages.next(totalPages);
      }),
      map((response) => response.articles)
    );
  }

  getPage(page: number) {
    this.pagesInput.next(page);
  }
}
