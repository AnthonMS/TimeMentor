import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts$: Array<object> = [];

  constructor(private data: DataService) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    /*this.data.getPosts().subscribe((data: Array<object>) => {
      this.posts$ = data;
    })*/
  }

}
