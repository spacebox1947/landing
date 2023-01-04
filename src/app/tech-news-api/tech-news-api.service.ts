import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject, Observable, throwError } from 'rxjs';
import { switchMap, tap, map, catchError, retry} from 'rxjs/operators'
import { NotificationsService } from '../notifications/notifications.service';
import { Article } from '../news-api/news-api.service';

@Injectable({
  providedIn: 'root'
})
export class TechNewsApiService {

  constructor(
    private http: HttpClient,
    private notificationsService: NotificationsService
  ) { }
}
