import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HackerNewsArticleListComponent } from './hacker-news-article-list.component';

describe('HackerNewsArticleListComponent', () => {
  let component: HackerNewsArticleListComponent;
  let fixture: ComponentFixture<HackerNewsArticleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HackerNewsArticleListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HackerNewsArticleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
