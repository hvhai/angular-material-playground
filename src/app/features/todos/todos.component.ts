import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { DEFAULT_APP_TODO, TodoNote } from 'src/app/core/models';
import { TodoService } from 'src/app/core/services/adapter/todo.service';
import { TodoServiceApi } from 'src/app/core/services/todo.service.api';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
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
  DEFAULT_TODO_FORM_VALUE = { id: '', note: '' };
  private dataSubject: BehaviorSubject<TodoNote[]> = new BehaviorSubject<
    TodoNote[]
  >([]);
  public dataSource$: Observable<TodoNote[]> = this.dataSubject.asObservable();

  displayedColumns: string[] = ['id', 'note', 'done'];
  todoForm = this.formBuilder.group({
    id: '',
    note: this.formBuilder.control('', Validators.required),
  });
  isEdit: boolean = false;

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
    this.todoForm.value.note;
    var apiCall = this.isEdit
      ? this.todoService.update({
          ...DEFAULT_APP_TODO,
          id: this.todoForm.value.id!,
          note: this.todoForm.value.note!,
        })
      : this.todoService.add({
          ...DEFAULT_APP_TODO,
          note: this.todoForm.value.note!,
        });
    apiCall
      .pipe(
        tap((data) => {
          this.fetchData();
          this.todoForm.setValue(this.DEFAULT_TODO_FORM_VALUE);
        })
      )
      .subscribe();
  }

  removeNote(note: TodoNote): void {
    this.todoService
      .delete(note.id)
      .pipe(tap((data) => this.fetchData()))
      .subscribe();
  }

  showEditForm(note: TodoNote): void {
    this.isEdit = true;
    this.todoForm.setValue({ id: note.id, note: note.note });
  }
}
