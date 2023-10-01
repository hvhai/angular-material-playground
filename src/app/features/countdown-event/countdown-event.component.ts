import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { EventServiceApi } from 'src/app/core/services';
import { EventCardComponent } from './event-card/event-card.component';
import { AppEvent } from 'src/app/core/models';
import { EventService } from 'src/app/core/services/adapter';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-countdown-event',
  standalone: true,
  templateUrl: './countdown-event.component.html',
  styleUrls: ['./countdown-event.component.css'],
  imports: [CommonModule, EventCardComponent, MatButtonModule, RouterLink],
  providers: [{ provide: EventServiceApi, useClass: EventService }],
})
export class CountdownEventComponent {
  eventList$: Observable<AppEvent[]>;

  constructor(private eventService: EventServiceApi) {
    this.eventList$ = this.eventService.getAll();
  }
}
