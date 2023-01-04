import { TestBed } from '@angular/core/testing';

import { TechNewsApiService } from './tech-news-api.service';

describe('TechNewsApiService', () => {
  let service: TechNewsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TechNewsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
