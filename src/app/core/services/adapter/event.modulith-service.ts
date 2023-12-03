import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { environment as env } from '../../../../environments/environment';
import { EventServiceApi } from '../event.service.api';
import { AppEvent } from '../../models';
import * as EventModulithServiceDto from './event.modulith-service.dto';

@Injectable({
  providedIn: 'root',
})
export class EventModulithService extends EventServiceApi {
  add(event: AppEvent): Observable<AppEvent> {
    const body: EventModulithServiceDto.CreateEventRequest = {
      dateTime: event.time,
      name: event.title,
    };
    return this.httpClient
      .post<
        EventModulithServiceDto.ApiResponse<EventModulithServiceDto.EventDto>
      >(`${env.api.serverUrl}/events`, body)
      .pipe(
        map((res) => {
          const newEvent: AppEvent = {
            __typename: 'AppEvent',
            id: res.data.id,
            time: res.data.dateTime,
            title: res.data.name,
          };
          return newEvent;
        })
      );
  }

  delete(eventId: number): Observable<boolean> {
    return this.httpClient.delete(`${env.api.serverUrl}/events/${eventId}`).pipe(
      map((res) => {
        return true;
      }),
      catchError(async (err) => false)
    );
  }

  getAll(): Observable<AppEvent[]> {
    return this.httpClient
      .get<
        EventModulithServiceDto.ApiResponse<EventModulithServiceDto.EventDto[]>
      >(`${env.api.serverUrl}/events`)
      .pipe(
        map((e) => {
          const events: AppEvent[] = [];
          e.data.forEach((element) => {
            events.push({
              __typename: 'AppEvent',
              id: element.id,
              time: element.dateTime,
              title: element.name,
            });
          });
          return events;
        })
      );
  }

  update(event: AppEvent): Observable<AppEvent> {
    const body: EventModulithServiceDto.UpdateEventRequest = {
      id: event.id,
      dateTime: event.time,
      name: event.title,
    };
    return this.httpClient
      .put<EventModulithServiceDto.ApiResponse<EventModulithServiceDto.EventDto>>(
        `${env.api.serverUrl}/event/${event.id}`,
        body
      )
      .pipe(
        map((res) => {
          return event;
        })
      );
  }

  constructor(private httpClient: HttpClient) {
    super();
  }
}
