import { CommonModule, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { AppEvent, DEFAULT_APP_EVENT } from 'src/app/core/models';
import { EventServiceApi } from 'src/app/core/services';
import { EventService } from 'src/app/core/services/adapter';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './create-event.component.html',
  providers: [{ provide: EventServiceApi, useClass: EventService }],
})
export class CreateEventComponent {
  addEventForm = new FormGroup({
    title: new FormControl('', Validators.required),
    time: new FormControl(new Date(), Validators.required),
  });
  router = inject(Router);

  createEvent() {
    const event: AppEvent = {
      ...DEFAULT_APP_EVENT,
      time: this.addEventForm.value.time ?? new Date(),
      title: this.addEventForm.value.title ?? '',
    };
    console.log(event);
    this.eventService
      .add(event)
      .subscribe({ complete: () => this.router.navigateByUrl('/events') });
  }
  constructor(private eventService: EventServiceApi) {}
}
