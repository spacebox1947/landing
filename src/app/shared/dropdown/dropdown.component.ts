import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { NewsQueryOptions } from 'src/app/news-api/news-query-options';
import { NotificationsService } from 'src/app/notifications/notifications.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {
  @Input() label!: string;
  @Input() selectType!: string;
  @Output() country = new EventEmitter<string>;
  @Output() category = new EventEmitter<string>;
  
  newsOptions = new NewsQueryOptions;

  constructor(private notificationsService: NotificationsService) { }

  ngOnInit(): void {
  }

  updateCategory(category: string) {
    //this.newsApiService.getPageAndCategory({category, page: 1});
    console.log(`Dropdown selected: ${category}. Emitting!`);
    this.category.emit(category);
  }

  updateCountry(country: string) {
    //this.newsApiService.setCountry(country);
    console.log(`Dropdown selected: ${country}. Emitting!`);
    this.country.emit(country);
  }

  assertValidCategory(category: string) {
    switch(category.toLowerCase()) {
      case 'general':
      case 'entertainment':
      case 'technology':
      case 'business':
      case 'sports':
      case 'health':
      case 'science':
        return true;
      default:
        throw new Error(`Invalid Category value: ${category}`);
    }
  }

  assertValidCountryCode(country: string) {
    for (let c of this.newsOptions.getCountries()) {
      if (country.toLowerCase() === c) {
        return true;
      }
    }
    throw new Error(`Invalid Country ISO Code: ${country}`);
  }

  selectCategory(category: string) {
    try {
      this.assertValidCategory(category);
    }
    catch (error) {
      let msg = `Invalid news category: ${error}. Defaulting to \'general\'`;
      console.error(msg);
      this.notificationsService.addError(msg);
      category = 'general';
    }
    finally {
      console.log(category);
      this.updateCategory(category);
    }
  }

  selectCountry(country: string) {
    try {
      this.assertValidCountryCode(country);
    }
    catch (error) {
      let msg = `Invalid country code: ${error}. Defaulting to United States \'us\'`;
      console.log(msg);
      this.notificationsService.addError(msg);
      country = 'us'
    }
    finally {
      console.log(country);
      this.updateCountry(country);
    }
  }

}
