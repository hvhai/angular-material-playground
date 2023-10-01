import { Observable } from 'rxjs';
import { AppEvent } from '../models';

export abstract class EventServiceApi {
  abstract getAll(): Observable<AppEvent[]>;
  abstract delete(eventId: number): Observable<boolean>;
  abstract add(event: AppEvent): Observable<AppEvent>;
  abstract update(event: AppEvent): Observable<AppEvent>;
}
