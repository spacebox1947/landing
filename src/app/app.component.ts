import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'landing';

  validCategory(category: string) {
    if (category ===
      'general' || 'technology' || 
      'science' || 'health' || 'buisiness' ||
      'entertainment' || 'sports') {
        return category
    } else {
      return 'general';
    }
  }

}


