import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechNewsArticleListComponent } from './tech-news-article-list.component';

describe('TechNewsArticleListComponent', () => {
  let component: TechNewsArticleListComponent;
  let fixture: ComponentFixture<TechNewsArticleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechNewsArticleListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechNewsArticleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
