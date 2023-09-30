import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment as env } from '../../../../environments/environment';
import { EventServiceApi } from '../event.service.api';
import { AppEvent } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class EventService extends EventServiceApi {
  constructor(private httpClient: HttpClient) {
    super();
  }
  getAll(): Observable<AppEvent[]> {
    throw new Error('Method not implemented.');
  }
  delete(eventId: number): Observable<boolean> {
    throw new Error('Method not implemented.');
  }
  update(event: AppEvent): Observable<AppEvent> {
    throw new Error('Method not implemented.');
  }

  add(event: AppEvent): Observable<AppEvent> {
    const body = {
      time: event.time,
      title: event.title,
    };
    return this.httpClient
      .post<AppEvent>(`${env.api.serverUrl}/event`, body)
      .pipe(
        map((res) => {
          const newEvent: AppEvent = {
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
