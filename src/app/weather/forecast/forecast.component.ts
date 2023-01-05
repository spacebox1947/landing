import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {
  //forecastData: any[] = [];
  forecast$!: Observable<{
    dateString: string;
    temp: number;
    humidity: number;
  }[]>;

  constructor(private weatherService: WeatherService) { 
    this.forecast$ = weatherService.getForecast();
  }

  ngOnInit(): void {}

}
