import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment as env } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private httpClient: HttpClient) {
  }

  add(event: any): Observable<any> {
    const body = {
      time: event.time,
      title: event.title,
    };
    return this.httpClient
      .post<any>(
        `${env.api.serverUrl}/event`,
        body
      )
      .pipe(
        map((res) => {
          const newEvent: any = {
            __typename: 'AppEvent',
            id: res.id,
            time: res.time,
            title: res.title,
          };
          console.log('new event', newEvent);
          return newEvent;
        })
      );
  }
}
