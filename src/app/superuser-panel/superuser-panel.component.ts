import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-superuser-panel',
  templateUrl: './superuser-panel.component.html',
  styleUrls: ['./superuser-panel.component.css']
})
export class SuperuserPanelComponent implements OnInit {
  public indexTest = 0;

  public confirmTitle: string = 'OBS!';
  public confirmMessage: string = 'Er du sikker?';
  public confirmBtn: string = 'Ja';
  public confirmBtnCancel: string = 'Nej';
  public paginateConf = {
    itemsPerPage: 10, 
    currentPage: 1
  };

  private user: Object;
  private users: Array<object> = [];
  private editing: boolean = false;
  private indexClicked = null;

  private userFilter: any = {
    email: '',
    name: '',
    phone: '',
    username: ''
  };
  
  /*private _searchTerm: string;
  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(value: string) {
    this._searchTerm = value;
    console.log("SearchTerm new value = " + this._searchTerm);
  }*/

  constructor(private data: DataService,
    private cookieService: CookieService,
    private router: Router) { }

  ngOnInit() {
    if (!this.cookieService.check('token')) {
      this.router.navigate(['']);
    }
    this.getUser();
  }

  getUser() {
    //console.log(this.cookieService.get('token'));
    this.data.getUserWithToken(this.cookieService.get('token')).subscribe((response) => {
      this.user = response['result'][0];
      this.getAllUsers();
      //console.log(this.user);
      this.data.getUserCount(this.user['companyId']).subscribe((response) => {
        this.user['numberOfUsers'] = response['numberOfUsers'];
      });
    });
  }

  getAllUsers() {
    //console.log(this.user['companyId']);
    this.editing = false;
    this.users = [];
    this.data.getAllUsers(this.user['companyId']).subscribe((response) => {
      //console.log(response['result']);
      this.users = response['result'];
    });
  }

  editUser(user, indexClicked) {
    this.indexClicked = indexClicked;
    this.resetInputFields();
    this.activateInputFields(user);
  }

  private activateInputFields(user) {
    var inputArray = document.getElementsByClassName("form-control");
    let startIndex = 0;
    for (let q = 0; q < inputArray.length; q++) {
      if (inputArray[q]['value'] == user['name']) {
        startIndex = q;
      }
    }
    for (let q = startIndex; q < startIndex + 3; q++) {
      inputArray[q].removeAttribute('disabled');
      inputArray[q].setAttribute('enabled', 'enabled');
    }
    this.editing = true;
  }

  private resetInputFields() {
    this.editing = false;
    var inputArray = document.getElementsByClassName("form-control");
    for (let q = 0; q < inputArray.length; q++) {
      inputArray[q].removeAttribute('enabled');
      inputArray[q].setAttribute('disabled', 'disabled');
    }
  }

  private updateUserDetails(user) {
    //console.log(user);
    this.data.updateUsers(user).subscribe((response) => {
      //console.log(response);
      if (response['success'] == true) {
        this.resetInputFields();
      }
      else {

      }
    });
  }

  private deleteUser(user) {
    if (user['id'] !== this.user['id']) {
      this.data.deleteUser(user).subscribe((response) => {
        var respObj = JSON.parse(response);
        //console.log(respObj);
        if (respObj.success == true) {
          //console.log("SUCCESS");
          this.getAllUsers();
        } else {
          alert(respObj.msg);
        }
      });
    } else {
      alert("You cannot delete yourself");
    }
  }

  navigateToCreateUser() {
    this.router.navigate(['/', 'admin', 'create-user']);
  }

  test() {
    console.log(this.indexTest);
  }
}
