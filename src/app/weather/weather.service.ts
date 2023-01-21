import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { NotificationsService } from '../notifications/notifications.service';
import {
  share,
  mergeMap,
  Observable,
  of,
  map,
  switchMap,
  filter,
  toArray,
  tap,
  retry,
  throwError, //returns an observable (kinda like of)
  catchError //take error, and send a new value thru pipe
} from 'rxjs';

// https://openweathermap.org/forecast5
interface Coordinates {
  //accuracy: number;
  //altitude: number | null;
  //altitudeAccuracy: number | null;
  //heading: number | null;
  latitude: number;
  longitude: number;
  //speed: number | null;
}

interface OpenWeatherResponse {
  list: {
    dt_txt: string;
    main: {
      temp: number;
      //feels_like: number,
      //temp_min: number,
      //temp_max: number,
      //pressure: number,
      //sea_level: number,
      //grnd_level: number,
      humidity: number, //... maybe useful?
      //temp_kf: number
    }
    weather: {
      //id: number,
      //main: string,
      //description: string,
      //icon: string
    }
    clouds: {
      //all: number
    }
    wind: {
      //speed: number,
      //deg: number,
      //gust: number
    }
    visibility: number;
    pop: number;
    rain: {
      //'3h': number
    }
  }[]
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  //private apiKey: string = '32a19e051bda34e5ad42259a09063351';
  private apiKey: string = 'f0e8f978217fec479a93ef15f95a51d6';
  // okay ... so if 'api' is at the beginning of the string, angular will prepend your
  // local address to it. good to know!
  private weatherUrl: string = 'https://api.openweathermap.org/data/2.5/forecast';

  constructor(
    private http: HttpClient,
    private notificationsService: NotificationsService
  ) {}

  getForecast() {
    return this.getCurrentLocation().pipe(
      map(coords => {
        // take parameters and make a query string
        return new HttpParams()
          //set expects (string, string) args
          .set('lat', String(coords.latitude))
          .set('lon', String(coords.longitude))
          .set('units', 'imperial')
          .set('appid', this.apiKey)
      }),
      switchMap((params) => 
        /*
        * what error handling could go here?
        */
        this.http.get<OpenWeatherResponse>(this.weatherUrl, { params: params })
      ),
      // pull out the 'list' from the response
      map(response => response.list),
      // emit list values one by one with new Observs
      mergeMap(value => of(...value)),
      // get every eigth value (8 measurements per day)
      filter((value, index) => index%8 === 0),
      map((value) => {
        // take the interesting values from filtered objects
        return {
          dateString: value.dt_txt,
          temp: value.main.temp,
          //temp_min: value.main.temp_min,
          //temp_max: value.main.temp_max
          humidity: value.main.humidity
        };
      }),
      toArray(),
      share()
    );
  }

  // this is a very angular way to get location via browser
  getCurrentLocation() {
    return new Observable<Coordinates>((observer) => {
      console.log('Trying to get User Location')
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          // data we want to share
          observer.next(position.coords);
          //console.log(position.coords);
          observer.complete();
        },
        (err) =>  observer.error(err)
      );
    }).pipe(
      // resubscribe to this observable if there is an error
      // ALWAYS double check logic behind retry
      retry(1),
      // tap's first arg only executes if Observable completes the next() method
      // tap can take other args ()=>{} for errors + complete, but those are
      // depricated.
      tap(() => {
        this.notificationsService.addSuccess('Got user location!');
      }),
      // catchError only runs if the observable has an error
      catchError((err) => {
        // handle the error in some way
        this.notificationsService.addError(`Location denied. User is mean: ${err}`);
        // need to return a new observable from catchError
        // use default coordinates to still show some weather to user
        //  OR
        // throw an error through the pipe to do somethign with it
        return throwError(() => new Error());
      })
    );
  }
}
