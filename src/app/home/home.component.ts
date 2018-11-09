import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  usersNew$: Array<object> = [];

  constructor(private data: DataService) { }

  ngOnInit() {
    //this.getUsersNew();
  }

  getUsersNew() {
    this.data.getUsersNew().subscribe((data: Array<object>) => {
      this.usersNew$ = data;
    });
  }

}
