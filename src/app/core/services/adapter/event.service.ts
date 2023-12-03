import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
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

  delete(eventId: number): Observable<boolean> {
    return this.httpClient
      .delete<EventServiceDto.DeleteEventResponse>(
        `${env.api.serverUrl}/event/${eventId}`
      )
      .pipe(
        map((res) => {
          return true;
        }),
        catchError(async (err) => false)
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

  update(event: AppEvent): Observable<AppEvent> {
    const body: EventServiceDto.UpdateEventRequest = {
      time: event.time,
      title: event.title,
    };
    return this.httpClient
      .put<EventServiceDto.UpdateEventResponse>(
        `${env.api.serverUrl}/event/${event.id}`,
        body
      )
      .pipe(
        map((res) => {
          return event;
        })
      );
  }

  override getById(id: number): Observable<AppEvent> {
    throw new Error('Method not implemented.');
  }

  constructor(private httpClient: HttpClient) {
    super();
  }
}
