import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Task } from '../interfaces/task';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  @Output() searchEvent: EventEmitter<string> = new EventEmitter<string>();
  readonly API_URL = environment.apiUrl;

  constructor(
      private http: HttpClient,
  ) { }

  getTasks() {
    return this.http.get<Array<Task>>(`${this.API_URL}/Tasks`).pipe(
      map(data => {
            let todo : Task[] = [];
            let doing : Task[] = [];
            let done : Task[] = [];
            data.forEach( task=> {;
                if ( task.status == 'todo') {
                  todo.push(task);
                }
                if ( task.status == 'doing') {
                  doing.push(task);
                }
                if ( task.status == 'done') {
                  done.push(task);
                }
            });
            return {todo , doing , done}
        })
    )
  }

  addTask(task: Task) {
    return this.http.post<string>(`${this.API_URL}/Tasks/`, task);
  }

  updateTask(id: number, task: Task) {
    return this.http.put<Task>(`${this.API_URL}/Tasks/${id}`, task);
  }

}
