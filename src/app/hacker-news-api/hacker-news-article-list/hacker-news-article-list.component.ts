import { Component, OnInit } from '@angular/core';
import { HackerNewsApiService } from '../hacker-news-api.service';

@Component({
  selector: 'app-hacker-news-article-list',
  templateUrl: './hacker-news-article-list.component.html',
  styleUrls: ['./hacker-news-article-list.component.css']
})
export class HackerNewsArticleListComponent implements OnInit {

  constructor(private hackerNewsApiService: HackerNewsApiService) {
  }

  ngOnInit(): void {
  }

}
