import { Injectable } from '@angular/core';
import { Todoitem } from './todoitem';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodolistdetailService {

  constructor(private httpClient: HttpClient) {
  }

  getItems(list_id: number): Observable<Todoitem[]> {
    return this.httpClient.get<Todoitem[]>("http://localhost:3000/items?list_id=" + list_id);
  }

  getItemById(id: number): Observable<Todoitem> {
    return this.httpClient.get<Todoitem>("http://localhost:3000/items/" + id);
  }

  postTodoitem(todoitem: Todoitem): Observable<Todoitem> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post<Todoitem>("http://localhost:3000/items", todoitem, { headers: headers });
  }

  putTodoitem(id: number, todoitem: Todoitem): Observable<Todoitem> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.put<Todoitem>("http://localhost:3000/items/" + id, todoitem, { headers: headers });
  }

  deleteTodoitem(id: number): Observable<Todoitem> {
    return this.httpClient.delete<Todoitem>("http://localhost:3000/items/" + id);
  }

}
