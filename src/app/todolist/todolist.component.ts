import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Todoitem } from '../todoitem';
import { Todolist } from '../todolist';
import { TodolistdetailService } from '../todolistdetail.service';


@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})
export class TodolistComponent implements OnInit {
  @Input() todolist: Todolist = {
    id: 0, title: "", content: "", publishDate: "",
    type: ''
  };


  todoitems$: Observable<Todoitem[]> = new Observable<Todoitem[]>();
  constructor(private router: Router, private todolistdetailService: TodolistdetailService) { }

  ngOnInit(): void {
    this.todoitems$ = this.todolistdetailService.getItems(this.todolist.id);
  }
}
