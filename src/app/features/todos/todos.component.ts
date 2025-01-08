import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterLink, RouterModule } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { TodoNote } from 'src/app/core/models';
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
    RouterLink,
    RouterModule,
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
  displayedColumns: string[] = ['id', 'note', 'done'];
  dataSource$: Observable<TodoNote[]>;

  constructor(private todoSerive: TodoServiceApi) {
    this.dataSource$ = this.todoSerive.getAll()

  }

  markAsDone(isDone:boolean) {
    console.log("check action: ", isDone)
  }
}
