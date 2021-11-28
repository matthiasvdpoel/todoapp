import { Injectable } from '@angular/core';
import { Todolist } from './todolist';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodolistService {

  constructor(private httpClient: HttpClient) {
  }

  getTodolists(): Observable<Todolist[]> {
    return this.httpClient.get<Todolist[]>("http://localhost:3000/todolists");
  }

  getTodolistsById(id: number): Observable<Todolist> {
    return this.httpClient.get<Todolist>("http://localhost:3000/todolists/" + id);
  }

  postCategory(todolist: Todolist): Observable<Todolist> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.post<Todolist>("http://localhost:3000/todolists", todolist, { headers: headers });
  }
  putCategory(id: number, todolist: Todolist): Observable<Todolist> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.put<Todolist>("http://localhost:3000/todolists/" + id, todolist, { headers: headers });
  }

  deleteCategory(id: number): Observable<Todolist> {
    return this.httpClient.delete<Todolist>("http://localhost:3000/todolists/" + id);
  }

}
