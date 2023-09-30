import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventCardComponent } from './event-card/event-card.component';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { EventService } from 'src/app/core/services/event.service';

@Component({
  selector: 'app-countdown-event',
  standalone: true,
  imports: [CommonModule, EventCardComponent, MatButtonModule],
  templateUrl: './countdown-event.component.html'
})
export class CountdownEventComponent {

  createEvent(){
    this.eventService.add({'time': new Date(), title: 'test'}).subscribe( res =>{
      console.log(res);
    });
  }
  constructor(private eventService: EventService) {

  }


}
