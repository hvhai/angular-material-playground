import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment as env } from '../../../../environments/environment';
import { EventServiceApi } from '../event.service.api';
import { AppEvent } from '../../models';
import * as EventServiceDto from './event.service.dto';

@Injectable({
  providedIn: 'root',
})
export class EventService extends EventServiceApi {
  add(event: AppEvent): Observable<AppEvent> {
    const body: EventServiceDto.CreateEventRequest = {
      time: event.time,
      title: event.title,
    };
    return this.httpClient
      .post<EventServiceDto.CreateEventResponse>(
        `${env.api.serverUrl}/event`,
        body
      )
      .pipe(
        map((res) => {
          const newEvent: AppEvent = {
            __typename: 'AppEvent',
            id: res.id,
            time: res.time,
            title: res.title,
          };
          return newEvent;
        })
      );
  }

  getAll(): Observable<AppEvent[]> {
    return this.httpClient
      .get<EventServiceDto.GetAllEventResponse>(`${env.api.serverUrl}/event`)
      .pipe(
        map((e) => {
          const events: AppEvent[] = [];
          e.events.forEach((element) => {
            events.push({
              __typename: 'AppEvent',
              id: element.id,
              time: element.time,
              title: element.title,
            });
          });
          return events;
        })
      );
  }

  constructor(private httpClient: HttpClient) {
    super();
  }

  delete(eventId: number): Observable<boolean> {
    throw new Error('Method not implemented.');
  }
  update(event: AppEvent): Observable<AppEvent> {
    throw new Error('Method not implemented.');
  }
}
