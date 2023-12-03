import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
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
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AppEvent, DEFAULT_APP_EVENT } from 'src/app/core/models';
import { EventServiceApi } from 'src/app/core/services';
import { EventModulithService } from 'src/app/core/services/adapter/event.modulith-service';

@Component({
  selector: 'app-update-event',
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
  templateUrl: './update-event.component.html',
  providers: [{ provide: EventServiceApi, useClass: EventModulithService }],
})
export class UpdateEventComponent implements OnInit {
  updateEventForm = new FormGroup({
    title: new FormControl('', Validators.required),
    time: new FormControl(new Date(), Validators.required),
  });
  router = inject(Router);
  updatedEvent: AppEvent | undefined;
  // updatedEvent$: Observable<AppEvent> | undefined;
  id: number | undefined;

  constructor(
    private eventService: EventServiceApi,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.eventService.getById(this.id).subscribe((event) => {
      this.updatedEvent = event;
      this.updateEventForm = new FormGroup({
        title: new FormControl(event.title, Validators.required),
        time: new FormControl(event.time, Validators.required),
      });
    });
  }

  updateEvent() {
    const event: AppEvent = {
      ...DEFAULT_APP_EVENT,
      id: this.id ?? -1,
      time: this.updateEventForm.value.time
        ? new Date(this.updateEventForm.value.time)
        : new Date(),
      title: this.updateEventForm.value.title ?? '',
    };
    console.log(event);
    this.eventService
      .update(event)
      .subscribe({ complete: () => this.router.navigateByUrl('/events') });
  }
}
