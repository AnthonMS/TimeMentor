import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
//import * as shajs from 'sha.js';
import { sha256 } from 'js-sha256';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  public loginSuccess = false;
  public loginUnsuccess = false;

  public email = "Anthon@Steiness.info";
  public pass = "EasyPass12";

  constructor(private data: DataService, private cookieService: CookieService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    var me = this;
    var hashedPass = sha256(me.pass);
    var user = {
      email: me.email,
      password: hashedPass
    };

    // Call too the Login service
    me.data.login(user).subscribe((response) => {
      //console.log(response);
      let resp = JSON.parse(response);
      if (resp.success) {
        me.loginSuccess = true;
        me.loginUnsuccess = false;

        // Checks whether or not there is a cookie on the users browser with user token.
        me.checkLoginCookie(user);

        setTimeout(function () {
          me.router.navigate(['']);
        }, 500);
      } else {
        me.loginUnsuccess = true;
        me.loginSuccess = false;
      }
    });
  }

  private checkLoginCookie(user) {
    if (this.cookieService.check('token')) {
      //console.log("Cookie exists");
    }
    else {
      // if there is no token cookie in the browser. call this method to generate token string and send it to the service
      // This service responds with either EXIST or NOT EXIST. If the token already exist, the service is called again. 
      // It is a recursive function.
      this.callTokenService(user);
    }

  }

  private callTokenService(user) {
    let token = this.makeToken();
    user.token = token;

    this.data.checkToken(user).subscribe((response) => {
      console.log(response);
      let resp = JSON.parse(response);
      if (resp.msg == "EXIST") {
        this.callTokenService(user);
      } else {
        this.cookieService.set('token', user.token);
      }
    });
  }

  private deleteLoginCookie(user) {
    if (this.cookieService.check('token')) {
      this.cookieService.delete('token');
    }
  }

  private makeToken() {
    let tokenLength = 75;
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < tokenLength; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

}
