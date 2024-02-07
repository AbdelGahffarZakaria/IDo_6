import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Task } from 'src/app/interfaces/task';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  toDo: Task[]
  doing: Task[]
  done: Task[] 

  loading = true;

  constructor(private router: Router, private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {

    this.authService.authorize()
      .subscribe({
        next: res => {
          this.authService.setUser(res);
          this.userService.getTasks().subscribe(data => {
            this.toDo = data.todo;
            this.doing = data.doing;
            this.done = data.done;
            this.loading = false;
          })
        },
        error: err => {
          localStorage.removeItem('access_token');
          this.router.navigate(['/']);
        }
      });
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      let task = event.container.data[event.currentIndex];
      let status = (<string>event.container.element.nativeElement.getAttribute('id'));
      task.status = status; 
      this.userService.updateTask(task.id, task).subscribe();
    }
  }

  addTask() {
    let task = new Task;
    this.userService.addTask(task).subscribe((data :any)=>{
      task.id = data
      this.toDo.unshift(task)
      
    })
  }
}
