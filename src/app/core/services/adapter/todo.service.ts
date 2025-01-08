import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { environment as env } from '../../../../environments/environment';
import * as TodoServiceDto from './todo.service.dto';
import { TodoServiceApi } from '../todo.service.api';
import { TodoNote } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class TodoService extends TodoServiceApi {
  override markAsDone(id: string): Observable<TodoNote> {
    return this.httpClient
      .patch<TodoServiceDto.TodoApiResponse<TodoServiceDto.TodoDto>>(
        `${env.api.todoApiUrl}/${id}/done`,
        null
      )
      .pipe(
        map((res) => {
          return {
            __typename: 'TodoNote',
            id: res.data.id,
            note: res.data.note,
            isDone: res.data.isDone,
          };
        })
      );
  }

  add(todo: TodoNote): Observable<TodoNote> {
    const body: TodoServiceDto.CreateTodoRequest = {
      note: todo.note,
    };
    return this.httpClient
      .post<TodoServiceDto.TodoApiResponse<TodoServiceDto.TodoDto>>(
        `${env.api.todoApiUrl}`,
        body
      )
      .pipe(
        map((res) => {
          const newNote: TodoNote = {
            __typename: 'TodoNote',
            id: res.data.id,
            note: res.data.note,
            isDone: res.data.isDone,
          };
          return newNote;
        })
      );
  }

  delete(todoId: number): Observable<boolean> {
    return this.httpClient.delete(`${env.api.todoApiUrl}/${todoId}`).pipe(
      map((res) => {
        return true;
      }),
      catchError(async (err) => false)
    );
  }

  getAll(): Observable<TodoNote[]> {
    return this.httpClient
      .get<TodoServiceDto.TodoApiResponse<TodoServiceDto.TodoDto[]>>(
        `${env.api.todoApiUrl}`
      )
      .pipe(
        map((e) => {
          const todos: TodoNote[] = [];
          e.data.forEach((element) => {
            todos.push({
              __typename: 'TodoNote',
              id: element.id,
              note: element.note,
              isDone: element.isDone,
            });
          });
          return todos;
        }),
        catchError((e) => {
          console.log(e);
          return [];
        })
      );
  }

  update(note: TodoNote): Observable<TodoNote> {
    const body: TodoServiceDto.UpdateTodoRequest = {
      id: note.id,
      note: note.note,
    };
    return this.httpClient
      .patch<TodoServiceDto.TodoApiResponse<TodoServiceDto.TodoDto>>(
        `${env.api.todoApiUrl}`,
        body
      )
      .pipe(
        map((res) => {
          return {
            __typename: 'TodoNote',
            id: res.data.id,
            note: res.data.note,
            isDone: res.data.isDone,
          };
        })
      );
  }

  override getById(id: string): Observable<TodoNote> {
    return this.httpClient
      .get<TodoServiceDto.TodoApiResponse<TodoServiceDto.TodoDto>>(
        `${env.api.todoApiUrl}/${id}`
      )
      .pipe(
        map((res) => {
          return {
            __typename: 'TodoNote',
            id: res.data.id,
            note: res.data.note,
            isDone: res.data.isDone,
          };
        })
      );
  }

  constructor(private httpClient: HttpClient) {
    super();
  }
}
