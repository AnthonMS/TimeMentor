import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { sha256 } from 'js-sha256';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss', './create-user.component.css'],
  host: { '(ngModelChange)': 'checkInputFields($event)' }
})
export class CreateUserComponent implements OnInit {
  private user: Object;
  private newUser: Object = {
    name: '',
    email: '',
    emailRepeat: '',
    phone: '+45 ',
    password: '',
    passwordRepeat: ''
  };
  private error: String = "NONE";
  private disabled: boolean = true;
  nameText: String;

  constructor(private data: DataService,
    private cookieService: CookieService,
    private router: Router) { }

  ngOnInit() {
    if (!this.cookieService.check('token')) {
      this.router.navigate(['']);
    }
    this.getUser();
  }

  checkInputFields(event) {
    var phoneCharWrong = false;
    var phoneNo = this.newUser['phone'];

    for (var i = 0; i < phoneNo.length; i++) {
      //console.log(this.newUser['phone'].charAt(i));
      if (phoneNo.charAt(i).match('[+ 0-9]')) {
        //console.log("Phone matches");
      } else {
        //console.log("Phone does not match");
        phoneCharWrong = true;
      }
    }

    if (this.newUser['name'] !== '' && this.newUser['email'] !== '' && this.newUser['emailRepeat'] !== '' &&
      this.newUser['phone'] !== '' && this.newUser['password'] !== '' && this.newUser['passwordRepeat'] !== '') {
      if (!phoneCharWrong) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    } else {
      this.disabled = true;
    }
  }

  getUser() {
    //console.log(this.cookieService.get('token'));
    this.data.getUserWithToken(this.cookieService.get('token')).subscribe((response) => {
      this.user = response['result'][0];
      /*console.log(JSON.stringify(response['result'][0]));
      console.log(JSON.parse(JSON.stringify(response['result'][0])));*/
      this.data.getUserCount(this.user['companyId']).subscribe((response) => {
        this.user['numberOfUsers'] = response['numberOfUsers'];
      });
    });

  }

  hideShowPassword() {
    var x = document.getElementById('pass-create');
    var w = document.getElementById('passRe-create');
    if (x.getAttribute('type') === 'password') {
      x.setAttribute('type', 'text');
      w.setAttribute('type', 'text');
    } else {
      x.setAttribute('type', 'password');
      w.setAttribute('type', 'password');
    }
  }

  checkFieldsToCreateUser() {
    if (this.newUser['name'] && this.newUser['email'] && this.newUser['emailRepeat'] &&
      this.newUser['phone'] && this.newUser['password'] && this.newUser['passwordRepeat']) {

      if (this.newUser['email'] !== this.newUser['emailRepeat']) {
        this.error = "EMAIL_WRONG";
      }
      else if (this.newUser['password'] !== this.newUser['passwordRepeat']) {
        this.error = "PASS_WRONG";
      }
      else {
        this.error = "";
        this.createUser();
      }

    }
    else {
      this.error = "INPUT_MISSING"
    }
  }

  private createUser() {
    this.disabled = true;
    this.newUser['password'] = sha256(this.newUser['password']);
    this.newUser['passwordRepeat'] = sha256(this.newUser['passwordRepeat']);
    this.newUser['companyId'] = this.user['companyId'];
    this.newUser['username'] = this.checkUsername();

    if (this.user['numberOfUsers'] == this.user['licenseQuantity']) {
      this.error = "LICENSE_ERROR"
      this.disabled = true;
      this.newUser['password'] = '';
      this.newUser['passwordRepeat'] = '';
    } else {
      this.data.createUser(this.newUser).subscribe((response) => {
        if (response['success'] == true) {
          this.disabled = true;
          this.error = "SUCCESS"
          this.newUser['name'] = '';
          this.newUser['email'] = '';
          this.newUser['emailRepeat'] = '';
          this.newUser['phone'] = '+45 ';
          this.newUser['password'] = '';
          this.newUser['passwordRepeat'] = '';
        } else {
          this.error = "DB_ERROR"
          this.disabled = false;
          this.newUser['password'] = '';
          this.newUser['passwordRepeat'] = '';
          if (response['msg'] == 'EMAIL_EXIST') {
            this.error = "EMAIL_EXIST"
          }
        }
      });
    }


  }

  generateUsername() {
    var username = "";
    var nameSplitted = this.newUser['name'].split(" ");
    for (var i = 0; i < nameSplitted.length; i++) {
      //console.log(nameSplitted[i]);
      if (nameSplitted.length > 2) {
        username += nameSplitted[i].charAt(0);
      }
      else if (nameSplitted.length == 1) {
        username += nameSplitted[i].charAt(0);
        username += nameSplitted[i].charAt(1);
        username += nameSplitted[i].charAt(2);
      }
      else {
        username += nameSplitted[i].charAt(0);
        if (i + 1 == nameSplitted.length) {
          username += nameSplitted[i].charAt(1);
        }

      }
    }
    username = username.toUpperCase();
    username += "_" + Math.floor(1000 + Math.random() * 9000);

    return username;
  }

  private checkUsername() {
    let tempUsername = this.generateUsername();

    //console.log(tempUsername);
    this.data.checkUsername(tempUsername).subscribe((response) => {
      if (response >= '1') {
        //console.log("username exist");
        this.checkUsername();
      }
      else {
        //console.log("Username does not exist");
      }
    });

    return tempUsername;
  }

}
