import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { EventServiceApi } from 'src/app/core/services';
import { EventCardComponent } from './event-card/event-card.component';
import { AppEvent } from 'src/app/core/models';
import { EventService } from 'src/app/core/services/adapter';
import { Observable } from 'rxjs';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-countdown-event',
  standalone: true,
  templateUrl: './countdown-event.component.html',
  styleUrls: ['./countdown-event.component.css'],
  imports: [
    CommonModule,
    EventCardComponent,
    MatButtonModule,
    RouterLink,
    RouterModule,
  ],
  providers: [{ provide: EventServiceApi, useClass: EventService }],
})
export class CountdownEventComponent {
  eventList$: Observable<AppEvent[]>;
  router = inject(Router);

  deleteEvent(eventId: number): void {
    console.log('delete event emitted from child: ', eventId);
    this.eventService
      .delete(eventId)
      .subscribe({ complete: () => this.init() });
  }

  constructor(private eventService: EventServiceApi) {
    // this.init();
    this.eventList$ = this.eventService.getAll();
  }

  private init(): void {
    this.eventList$ = this.eventService.getAll();
  }
}
