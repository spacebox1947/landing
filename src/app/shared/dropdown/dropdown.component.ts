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
  countries = this.newsOptions.getCountriesObjects();

  constructor(private notificationsService: NotificationsService) { }

  ngOnInit(): void {}

  updateCategory(category: string) {
    //console.log(`Dropdown selected: ${category}. Emitting!`);
    this.category.emit(category);
  }

  updateCountry(country: string) {
    //console.log(`Dropdown selected: ${country}. Emitting!`);
    this.country.emit(country);
  }

  assertValidCategory(category: string) {
    for (let c of this.newsOptions.getCategories()) {
      if (category.toLowerCase() === c) {
        return true;
      }
    }
    throw new Error(`Invalid Category value: ${category}`);
  }

  assertValidCountry(country: string) {
    for (let c of this.newsOptions.getCountriesObjects()) {
      if (country === c.name) {
        return c.iso;
      }
    }
    throw new Error(`Invalid Country: ${country}. Defaulting to United States`)
  }

  selectCategory(category: string) {
    try {
      this.assertValidCategory(category);
    }
    catch (error) {
      let msg = `Invalid news category: ${error}. Defaulting to \'general\'`;
      this.notificationsService.addError(msg);
      category = 'general';
    }
    finally {
      this.updateCategory(category);
    }
  }

  selectCountry(country: string) {
    try {
      //this.assertValidCountryCode(country);
      country = this.assertValidCountry(country);
    }
    catch (error) {
      let msg = `Invalid country code: ${error}. Defaulting to United States \'us\'`;
      this.notificationsService.addError(msg);
      country = 'us'
    }
    finally {
      this.updateCountry(country);
    }
  }

}
