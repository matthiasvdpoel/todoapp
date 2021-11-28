import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NodeWithI18n } from '@angular/compiler';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { SelectMultipleControlValueAccessor } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Observable, Subject, Subscription } from 'rxjs';
import { Todoitem } from '../todoitem';
import { Todolist } from '../todolist';
import { TodolistService } from '../todolist.service';
import { TodolistdetailService } from '../todolistdetail.service';



@Component({
  selector: 'app-todolistdetail',
  templateUrl: './todolistdetail.component.html',
  styleUrls: ['./todolistdetail.component.scss']
})
export class TodolistdetailComponent implements OnDestroy, OnInit {
  dtOptions: DataTables.Settings = {};
  todolist: Todolist = {
    id: 0,
    title: '',
    type: '',
    content: '',
    publishDate: ''
  }
  todolistId: number = 0;
  todoitems$: Observable<Todoitem[]> = new Observable<Todoitem[]>();
  todoitems2: Todoitem[] = [];

  todoitemToAdd: Todoitem = {
    id: 0,
    list_id: this.todolistId,
    description: '',
    date: '',
    status: 'todo'
  }
  deleteTodolist$: Subscription = new Subscription();
  deleteItem$: Subscription = new Subscription();

  postTodoitem$: Subscription = new Subscription();
  errorMessage: string = '';
  isSubmitted: boolean = false;


  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private todolistService: TodolistService, private todolistdetailService: TodolistdetailService, private route: ActivatedRoute, private router: Router, private httpClient: HttpClient) { }

  ngOnInit() {

    this.todolistId = Number(this.route.snapshot.paramMap.get('id'));
    this.todoitemToAdd.list_id = this.todolistId;
   
    this.getTodolist();

    //volgende lijn wordt niet gebruikt
    this.httpClient.get<Todoitem[]>("http://localhost:3000/items?list_id=" + this.todolistId)
      .subscribe(
        data => {
          console.log(data);

          this.todoitems2 = data as Todoitem[];
          this.dtTrigger.next();
        });


    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      paging: false,
      searching: false,
      columnDefs: [
        { orderable: false, targets: 4 },
        { orderable: true, targets: '_all' }

      ],
      info: false,
      language: {
        emptyTable: "."
      }

    };
  }


  edit(id: number) {
    //Navigate to form in edit mode
    this.router.navigate(['todolist/form'], { state: { id: id, mode: 'edit' } });
  }

  delete(id: number) {
    this.deleteTodolist$ = this.todolistService.deleteCategory(id).subscribe(result => {
      //all went well
      this.router.navigate(['/']);
    }, error => {
      //error
      this.errorMessage = error.message;
    });
  }

  deleteTodoItem(id: number) {
    this.deleteItem$ = this.todolistdetailService.deleteTodoitem(id).subscribe(result => {
      //all went well
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentUrl]);
      });

    }, error => {
      //error
      this.errorMessage = error.message;
    });
  }

  changeStatus(todoitemId: number) {
    this.todolistdetailService.getItemById(todoitemId).subscribe(result => {

      console.log(result)
      if (result.status === 'done') {
        result.status = 'todo';
      }
      else {
        if (result.status === 'todo') {
          result.status = 'done';
        }
      }
      console.log(result)
      this.todolistdetailService.putTodoitem(todoitemId, result).subscribe();
    });

  }

  getTodolist() {
    this.todoitems$ = this.todolistdetailService.getItems(this.todolistId);
    this.todolistService.getTodolistsById(this.todolistId).subscribe(result => this.todolist = result);
    this.dtTrigger.next();
  }

  changeDescription(event: any, todoitemId: number) {
    var newDescription = event.target.value;
    console.log('change: ' + newDescription);

    this.todolistdetailService.getItemById(todoitemId).subscribe(result => {
      result.description = newDescription;
      this.todolistdetailService.putTodoitem(todoitemId, result).subscribe();
    });
  }


  onSubmit() {
    this.isSubmitted = true;

    this.todoitemToAdd.date = formatDate(new Date(), 'dd/MM/yyyy HH:mm', 'en') as unknown as string;

    this.postTodoitem$ = this.todolistdetailService.postTodoitem(this.todoitemToAdd).subscribe(result => {
      //all went well
      let currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);

    },
      error => {
        this.errorMessage = error.message;
      });
  }




  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }


}




