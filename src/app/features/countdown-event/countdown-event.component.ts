import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { EventServiceApi } from 'src/app/core/services';
import { EventCardComponent } from './event-card/event-card.component';
import { AppEvent } from 'src/app/core/models';
import { EventService } from 'src/app/core/services/adapter';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-countdown-event',
  standalone: true,
  imports: [CommonModule, EventCardComponent, MatButtonModule],
  templateUrl: './countdown-event.component.html',
  providers: [{ provide: EventServiceApi, useClass: EventService }],
})
export class CountdownEventComponent {
  eventList$: Observable<AppEvent[]>;

  createEvent() {
    const event: AppEvent = {
      __typename: 'AppEvent',
      id: 1,
      time: new Date(),
      title: 'test',
    };
    this.eventService.add(event).subscribe((res) => {
      console.log(res);
    });
  }
  constructor(private eventService: EventServiceApi) {
    this.eventList$ = this.eventService.getAll();
  }
}
