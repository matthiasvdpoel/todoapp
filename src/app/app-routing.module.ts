import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TodolistFormComponent } from './todolist-form/todolist-form.component';
import { TodolistdetailComponent } from './todolistdetail/todolistdetail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'todolist/form', component: TodolistFormComponent },
  { path: 'todolist/:id', component: TodolistdetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
