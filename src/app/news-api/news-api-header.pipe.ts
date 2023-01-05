import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'newsApiHeader'
})
export class NewsApiHeaderPipe implements PipeTransform {

  transform(category: string): string {
    const slug = `Regional news to keep you informed!`;
    switch(category) {
      case 'general':
        return slug;
      case 'entertainment':
        return `Entertainment news so you are in the know!`;
      case 'technology':
        return `All the Tech news that fits the bit`;
      case 'business':
        return `Stay wealthy with Business news`;
      case 'sports':
        return `No Guff Buff Stuff: Its Sports!`
      case 'health':
        return `Health news to keep you stronk`
      case 'science':
        return `Welcome to the world of tomorrow!`
      default:
        return slug;
    }
  }

}
