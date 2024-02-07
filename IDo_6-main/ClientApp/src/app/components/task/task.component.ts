import { Component, Input, OnInit, ViewChildren, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Task } from 'src/app/interfaces/task';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, AfterViewInit {

  @Input() data: Task;
  @ViewChildren('root') root: ElementRef;
  titleShown = true;
  importanceShown = true;
  typing = false
  searchText: string;

  constructor(private userService: UserService, private datePipe: DatePipe) { }

  ngOnInit(): void {

    this.userService.searchEvent.subscribe(searchText => { this.searchText = searchText; console.log(searchText) })
    let formattedDate = (<string>this.datePipe.transform(this.data.dueDate, 'yyyy-MM-dd'))
    this.data.dueDate = formattedDate
  }

  ngAfterViewInit(): void {
  }

  @HostListener('document:click', ['$event'])
  documentClick(event: any) {
    if (this.typing) {
      this.userService.updateTask(this.data.id, this.data).subscribe();
      this.titleShown = true;
      this.typing = false;
    }
  }


  onImportanceChange() {
    this.importanceShown = true;
    this.typing = true;
  }
}
