import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private loggedIn: Boolean = false;
  private user: Object;

  constructor(private data: DataService,
    private cookieService: CookieService,
    private router: Router) { }

  ngOnInit() {
    //this.getUser();
    if (!this.cookieService.check('token')) {
      //this.router.navigate(['']);
      this.loggedIn = false;
    } else {
      this.loggedIn = true;
    }

    console.log(this.loggedIn);
  }

  getUser() {
    this.data.getUserWithToken(this.cookieService.get('token')).subscribe((response) => {
      //console.log(response);
      let resp = JSON.parse(response);
      console.log(resp);
      resp.result[0].oldEmail = resp.result[0].email;
      this.user = resp.result[0];
    });
  }

}
