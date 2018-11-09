import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users$: Array<object> = [];

  constructor(private data: DataService) { }

  ngOnInit() {
    //this.getUsers();
  }

  /*getUsers() {
    this.data.getUsers().subscribe((data: Array<object>) => {
      this.users$ = data;
      //console.log('Tester Tester!');
      //console.log(data);
    });
  }*/

}
