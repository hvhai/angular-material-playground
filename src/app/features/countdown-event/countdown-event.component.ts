import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventCardComponent } from './event-card/event-card.component';

@Component({
  selector: 'app-countdown-event',
  standalone: true,
  imports: [CommonModule, EventCardComponent],
  templateUrl: './countdown-event.component.html'
})
export class CountdownEventComponent {

}
