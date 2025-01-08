import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterLink, RouterModule } from '@angular/router';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { DEFAULT_APP_TODO, TodoNote } from 'src/app/core/models';
import { TodoService } from 'src/app/core/services/adapter/todo.service';
import { TodoServiceApi } from 'src/app/core/services/todo.service.api';
import {
  FormArray,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    RouterLink,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './todos.component.html',
  providers: [
    {
      provide: TodoServiceApi,
      useClass: TodoService,
    },
  ],
})
export class TodosComponent {
  private dataSubject: BehaviorSubject<TodoNote[]> = new BehaviorSubject<
    TodoNote[]
  >([]);
  public dataSource$: Observable<TodoNote[]> = this.dataSubject.asObservable();

  displayedColumns: string[] = ['id', 'note', 'done'];
  todoForm = this.formBuilder.group({
    note: this.formBuilder.control('', Validators.required),
  });

  constructor(
    private todoService: TodoServiceApi,
    private formBuilder: FormBuilder,
    protected changeDetectorRef: ChangeDetectorRef
  ) {
    this.fetchData();
  }

  fetchData(): void {
    this.todoService
      .getAll()
      .pipe(tap((data) => this.dataSubject.next(data)))
      .subscribe();
  }

  markAsDone(isDone: boolean, id: string) {
    console.log('check action: ', isDone);
    this.todoService
      .markAsDone(id)
      .pipe(tap((data) => this.fetchData()))
      .subscribe();
  }

  addNote() {
    console.log('add note');
    this.todoForm.value.note;
    this.todoService
      .add({
        ...DEFAULT_APP_TODO,
        note: this.todoForm.value.note!,
      })
      .pipe(tap((data) => this.fetchData()))
      .subscribe();
  }
}
