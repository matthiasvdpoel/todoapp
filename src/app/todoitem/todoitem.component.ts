import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Todoitem } from '../todoitem';

@Component({
  selector: 'app-todoitem',
  templateUrl: './todoitem.component.html',
  styleUrls: ['./todoitem.component.scss']
})
export class TodoitemComponent implements OnInit {
 
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
