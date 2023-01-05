import { NewsApiHeaderPipe } from './news-api-header.pipe';

describe('NewsApiHeaderPipe', () => {
  it('create an instance', () => {
    const pipe = new NewsApiHeaderPipe();
    expect(pipe).toBeTruthy();
  });
});
