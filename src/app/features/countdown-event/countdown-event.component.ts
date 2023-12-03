import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { AppEvent } from 'src/app/core/models';
import { EventServiceApi } from 'src/app/core/services';
import { EventModulithService } from 'src/app/core/services/adapter/event.modulith-service';
import { EventCardComponent } from './event-card/event-card.component';

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
  providers: [{ provide: EventServiceApi, useClass: EventModulithService }],
})
export class CountdownEventComponent {
  eventList$: Observable<AppEvent[]>;
  router = inject(Router);

  deleteEvent(eventId: number): void {
    console.log('delete event emitted from child: ', eventId);
    this.eventList$ = this.eventService
      .delete(eventId)
      .pipe(switchMap((id) => this.eventService.getAll()));
  }

  constructor(private eventService: EventServiceApi) {
    // this.init();
    this.eventList$ = this.eventService.getAll();
  }

  private init(): void {
    this.eventList$ = this.eventService.getAll();
  }
}
