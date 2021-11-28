import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodolistdetailComponent } from './todolistdetail.component';

describe('TodolistdetailComponent', () => {
  let component: TodolistdetailComponent;
  let fixture: ComponentFixture<TodolistdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodolistdetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodolistdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
