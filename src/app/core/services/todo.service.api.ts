import { Observable } from 'rxjs';
import { TodoNote } from '../models';

export abstract class TodoServiceApi {
  abstract getAll(): Observable<TodoNote[]>;
  abstract delete(id: number): Observable<boolean>;
  abstract add(note: TodoNote): Observable<TodoNote>;
  abstract update(note: TodoNote): Observable<TodoNote>;
  abstract markAsDone(id: string): Observable<TodoNote>;
  abstract getById(id: string): Observable<TodoNote>;
}
