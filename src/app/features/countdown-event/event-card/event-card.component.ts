import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AppEvent, DEFAULT_APP_EVENT } from 'src/app/core/models';

@Component({
  selector: 'app-event-card',
  styleUrls: ['./event-card.component.css'],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './event-card.component.html',
})
export class EventCardComponent {
  @Input() event: AppEvent = { ...DEFAULT_APP_EVENT };
  @Output() deleteButtonClicked = new EventEmitter<number>();
  @Output() updateButtonClicked = new EventEmitter<number>();

  deleteEvent(id: number) {
    if (id != null && id != undefined) {
      this.deleteButtonClicked.emit(id);
    }
  }

  updateEvent(id: number) {
    if (id != null && id != undefined) {
      this.updateButtonClicked.emit(id);
    }
  }
}
