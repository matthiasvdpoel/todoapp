import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Todolist } from '../todolist';
import { TodolistService } from '../todolist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  todolists$: Observable<Todolist[]> = new Observable<Todolist[]>();

  constructor(private todolistService: TodolistService,  private router: Router) { }

  ngOnInit(): void {
    this.todolists$ = this.todolistService.getTodolists();
  }

  add() {
    //Navigate to form in add mode
    this.router.navigate(['todolist/form'], {state: {mode: 'add'}});
  }
}
