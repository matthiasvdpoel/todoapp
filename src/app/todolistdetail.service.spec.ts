import { TestBed } from '@angular/core/testing';

import { TodolistdetailService } from './todolistdetail.service';

describe('TodolistdetailService', () => {
  let service: TodolistdetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodolistdetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
