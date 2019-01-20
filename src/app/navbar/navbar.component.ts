import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  homeTab:Boolean = false; registerTab:Boolean = false; userTab:Boolean = false;
  supportTab:Boolean = false; signInTab:Boolean = false; adminTab:Boolean = false;
  public currentTab:String = "";

  public loginCookieExist: Boolean = false;

  constructor(private cookieService: CookieService,
    private location: Location,
    private router: Router) {
    router.events.subscribe((val) => {
      //console.log("Router subscribtion triggered");
      this.checkLoginCookie();
      this.checkCurrentTab();
    });
  }

  ngOnInit() {
    this.checkLoginCookie();
  }

  test() {
    //let loggedIn = this.signInComp.getLoggedIn();
    //console.log("Test");
  }

  checkCurrentTab(){
    //console.log(this.router.url);
    this.currentTab = this.router.url;
    //this.changeActiveLink();
    if (this.currentTab.includes('admin')) {
      this.adminTab = true;
    }
    else {
      this.adminTab = false;
    }
  }

  changeActiveLink() {
    this.resetActiveLink();
    console.log(this.currentTab);
    if (this.currentTab == '') {

    }
    else if (this.currentTab.includes('features')) {

    }
    else if (this.currentTab.includes('about')) {

    }
    else if (this.currentTab.includes('support')) {

    }
    else if (this.currentTab.includes('logind')) {

    }
    else if (this.currentTab.includes('')) {

    }
  }

  resetActiveLink() {
    var navLink2 = document.getElementsByClassName("nav-link-2");
    var navItem = document.getElementsByClassName("nav-item");
    for (var q = 0; q < navLink2.length; q++) {
      navLink2[q].setAttribute('class', 'nav-link-2');
    }
    for (var q = 0; q < navItem.length; q++) {
      navItem[q].setAttribute('class', 'nav-item');
    }
  }

  logout() {
    this.cookieService.delete('token');
  }


  private checkLoginCookie() {
    if (this.cookieService.check('token')) {
      this.loginCookieExist = true;
    }
    else {
      this.loginCookieExist = false;
    }
  }

}
