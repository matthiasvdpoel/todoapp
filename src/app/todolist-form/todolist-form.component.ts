import { formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Todolist } from '../todolist';
import { TodolistService } from '../todolist.service';

@Component({
  selector: 'app-todolist-form',
  templateUrl: './todolist-form.component.html',
  styleUrls: ['./todolist-form.component.scss']
})
export class TodolistFormComponent implements OnInit, OnDestroy {
  isAdd: boolean = false;
  isEdit: boolean = false;
  todolistId: number = 0;

  todolist: Todolist = {
    id: 0,
    title: '',
    type: '',
    content: '',
    publishDate: ''
  }

  isSubmitted: boolean = false;
  errorMessage: string = "";

  todolist$: Subscription = new Subscription();
  postTodolist$: Subscription = new Subscription();
  putTodolist$: Subscription = new Subscription();

  constructor(private router: Router, private todolistService: TodolistService) {
    this.isAdd = this.router.getCurrentNavigation()?.extras.state?.mode === 'add';
    this.isEdit = this.router.getCurrentNavigation()?.extras.state?.mode === 'edit';
    this.todolistId = +this.router.getCurrentNavigation()?.extras.state?.id;

    if (this.todolistId != null && this.todolistId > 0) {
      this.todolist$ = this.todolistService.getTodolistsById(this.todolistId).subscribe(result => this.todolist = result);
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.todolist$.unsubscribe();
    this.postTodolist$.unsubscribe();
    this.putTodolist$.unsubscribe();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.isAdd) {
      this.todolist.publishDate = formatDate(new Date(), 'dd/MM/yyyy', 'en') as unknown as string;
      this.postTodolist$ = this.todolistService.postCategory(this.todolist).subscribe(result => {
        //all went well
        this.router.navigateByUrl("/todolist/" + result.id);
      },
        error => {
          this.errorMessage = error.message;
        });
    }
    if (this.isEdit) {
      this.putTodolist$ = this.todolistService.putCategory(this.todolistId, this.todolist).subscribe(result => {
        //all went well
        this.router.navigateByUrl("/todolist/" + result.id);
      },
        error => {
          this.errorMessage = error.message;
        });
    }
  }

}
