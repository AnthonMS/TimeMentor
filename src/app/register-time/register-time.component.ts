import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ArrayType } from '@angular/compiler';

@Component({
  selector: 'app-register-time',
  templateUrl: './register-time.component.html',
  styleUrls: ['./register-time.component.css']
})
export class RegisterTimeComponent implements OnInit {
  private user: Object;
  private borgere: Array<object> = [];
  private timeIntervals: Array<string> = ['15 Min.', '30 Min.', '45 Min.', '1 Time', '1 Time, 15 Min.',
    '1 Time, 30 Min.', '1 Time, 45 Min.', '2 Timer', '2 Timer, 30 Min.', '3+ Timer'];

  private advancedIntervalArray: Array<Array<any>> = [['15 Min.', '30 Min.', '45 Min.', '1 Time', '1 Time, 15 Min.', 
    '1 Time, 30 Min.', '1 Time, 45 Min.', '2 Timer', '2 Timer, 30 Min.', '3+ Timer'], [15, 30, 45, 60, 75, 90, 105, 120, 150, 180]];

  private attendanceArray: Array<string> = ['Mødt', 'Udeblevet', 'Aflyst', 'Ferie'];
  private registrationForm: Object = {
    borgerId: null,
    companyId: null,
    date: new Date(),
    description: '',
    timeInterval: 'Tid brugt',
    tmpTime: 0,
    attendance: 'Vælg fremmøde',
    userId: null,
  };

  private selectedBorger: Object;
  private comboboxMsg: string = "Vælg borger";
  datePickerConfig: Partial<BsDatepickerConfig>;
  dateOfRegistration: Date = new Date();
  private responseMsg:string = "NONE";

  constructor(private data: DataService,
    private cookieService: CookieService,
    private router: Router) {
    this.datePickerConfig = Object.assign({},
      {
        containerClass: 'theme-dark-blue',
        dateInputFormat: 'DD-MM-YYYY'
      });
  }

  ngOnInit() {
    if (!this.cookieService.check('token')) {
      this.router.navigate(['']);
    }
    this.getUser();
  }

  getUser() {
    this.data.getUserWithToken(this.cookieService.get('token')).subscribe((response) => {
      response['result'][0]['oldEmail'] = response['result'][0]['email'];
      this.user = response['result'][0];

      this.data.getBorgere(this.user['companyId']).subscribe((response) => {
        let respObj = JSON.parse(response);
        if (respObj.success == true) {
          this.borgere = respObj.result;
        } else {
          this.borgere = null;
        }
      });

    });
  }

  selectBorger(index) {
    this.selectedBorger = this.borgere[index];
    this.comboboxMsg = this.selectedBorger['name'];
    this.registrationForm['companyId'] = this.borgere[index]['companyId'];
    this.registrationForm['borgerId'] = this.borgere[index]['id'];
  }

  selectTime(index) {
    this.registrationForm['timeInterval'] = this.advancedIntervalArray[0][index];
    this.registrationForm['tmpTime'] = this.advancedIntervalArray[1][index];
  }

  test() {

  }

  registerTime() {
    this.registrationForm['userId'] = this.user['id'];

    this.data.registerTime(this.registrationForm).subscribe((response) => {
      //console.log(response);
      let resp = JSON.parse(response);
      if (resp.success) {
        this.responseMsg = "SUCCESS";
      } else {
        this.responseMsg = "DB_ERROR";
      }
    });
  }

  checkInputFields() {
    let disableBtn = true;
    let temp = this.dateOfRegistration instanceof Date;
    //console.log(this.dateOfRegistration);
    if (this.comboboxMsg !== 'Vælg borger' && this.registrationForm['timeInterval'] !== 'Tid brugt' && temp) {
      disableBtn = false;
    }
    //console.log(disableBtn);
    return disableBtn;
  }

}
