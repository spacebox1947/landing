import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs';

export interface Article {
  //by: string,
  //descendants: number,
  //kids: number[],
  //score: number,
  //time: number,
  title: string,
  //type: string,
  url: string
}

interface TopStoryRequest {

}

interface HackerNewsResponse {
  
  something: Article[]
}

@Injectable({
  providedIn: 'root'
})
export class HackerNewsApiService {
  //topStories: Observable<any[]>;
  storyIds!: number[];

  private url = 'https://hacker-news.firebaseio.com/v0/newsstories';
  //private url = 'https://hacker-news.firebaseio.com/v0/item/121003';

  constructor(private http: HttpClient) {

    /* this.topStories.subscribe((response) => {
      this.storyIds = response
      console.log(this.storyIds);
    }); */
    this.getTopStories().subscribe((response) => {
      tap(response => console.log(response))
    });
  }

  getTopStories() {
    return this.http.get(this.url, {params: {origin: '*'}});
  }
}
