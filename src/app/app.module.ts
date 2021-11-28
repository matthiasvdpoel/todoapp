import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TodolistComponent } from './todolist/todolist.component';
import { TodoitemComponent } from './todoitem/todoitem.component';
import { TodolistdetailComponent } from './todolistdetail/todolistdetail.component';
import { MenuComponent } from './menu/menu.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TodolistFormComponent } from './todolist-form/todolist-form.component';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [

    AppComponent,
    HomeComponent,
    TodolistComponent,
    TodoitemComponent,
    TodolistdetailComponent,
    MenuComponent,
    TodolistFormComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
