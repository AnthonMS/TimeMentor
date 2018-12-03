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
  private filteredUsers: Array<object> = [];
  private editing: boolean = false;
  private indexClicked = null;
  
  private _searchTerm: string;
  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filterUserlist();
  }

  constructor(private data: DataService,
    private cookieService: CookieService,
    private router: Router) { }

  ngOnInit() {
    if (!this.cookieService.check('token')) {
      this.router.navigate(['']);
    }
    this.getUser();
  }

  private filterUserlist() 
  {
    var tempSearch = this._searchTerm.toLowerCase();
    this.filteredUsers = [];

    for (var q = 0; q < this.users.length; q++) 
    {
      var tempName = this.users[q]['name'].toLowerCase();
      var tempMail = this.users[q]['email'].toLowerCase();
      var tempPhone = this.users[q]['phone'].toLowerCase();

      if (tempName.includes(tempSearch)) {
        this.filteredUsers.push(this.users[q]);
      }
      else if (tempMail.includes(tempSearch)) {
        this.filteredUsers.push(this.users[q]);
      }
      else if (tempPhone.includes(tempSearch)) {
        this.filteredUsers.push(this.users[q]);
      }
    }
  }

  getUser() {
    this.data.getUserWithToken(this.cookieService.get('token')).subscribe((response) => {
      //console.log(response);
      let resp = JSON.parse(response);
      this.user = resp.result[0];
      this.getAllUsers();
      this.data.getUserCount(this.user['companyId']).subscribe((response) => {
        //console.log(response);
        let resp = JSON.parse(response);
        this.user['numberOfUsers'] = resp.result.numberOfUsers;
        //this.user['numberOfUsers'] = response['numberOfUsers'];
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
      this.filteredUsers = response['result'];
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
      if (inputArray[q]['value'] == user['email']) {
        startIndex = q - 1;
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
      if (inputArray[q].getAttribute('id') !== 'search-input') {
        inputArray[q].removeAttribute('enabled');
        inputArray[q].setAttribute('disabled', 'disabled');
      }
      
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
    //console.log(this.indexTest);
  }
}
