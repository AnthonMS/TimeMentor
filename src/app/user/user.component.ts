import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public user: Object;
  private disabled: boolean = true;
  private responseMsg = '';
  private updateError = false;
  private updateSuccess = false;

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
    this.data.getUserWithToken(this.cookieService.get('token')).subscribe((response) => {
      //console.log(response);
      let resp = JSON.parse(response);
      resp.result[0].oldEmail = resp.result[0].email;
      this.user = resp.result[0];
    });
  }

  updateUser() {
    //console.log(this.user);
    if (this.user['name'] === '' || this.user['email'] === '' || this.user['phone'] === '' ||
      this.user['companyName'] === '' || this.user['companyEmail'] === '' || this.user['companyPhone'] === '') {
      this.responseMsg = 'MISSING_INPUT';
      this.updateError = true;
      this.updateSuccess = false;
    }
    else {
      this.data.updateUser(this.user).subscribe((response) => {
        //console.log(response);
        let resp = JSON.parse(response);
        if (resp.success === true) {
          this.responseMsg = 'SUCCESS';
          this.updateError = false;
          this.updateSuccess = true;
          this.disabled = true;
          this.getUser();
        } else {
          this.responseMsg = 'DB_ERROR';
          if (resp.msg == 'EMAIL EXIST') {
            this.responseMsg = 'EMAIL_EXIST';
          }
          this.updateError = true;
          this.updateSuccess = false;
        }

      });
    }
  }

  

}
