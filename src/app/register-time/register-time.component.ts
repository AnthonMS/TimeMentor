import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

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
  private attendanceArray: Array<string> = ['Mødt', 'Udeblevet', 'Aflyst', 'Ferie'];
  private registrationForm: Object = {
    borgerId: null,
    companyId: null,
    date: new Date(),
    description: '',
    timeInterval: 'Tid brugt',
<<<<<<< HEAD
    userId: null
=======
    attendance: 'Vælg fremmøde',
    userId: null,
>>>>>>> 29672cc81816d75e970762e64a72cf517431c635
  };

  private selectedBorger: Object;
  private comboboxMsg: string = "Vælg borger";
  datePickerConfig: Partial<BsDatepickerConfig>;
  dateOfRegistration: Date = new Date();

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
    //console.log(this.borgere[index]);
    this.selectedBorger = this.borgere[index];
    this.comboboxMsg = this.selectedBorger['name'];
    this.registrationForm['companyId'] = this.borgere[index]['companyId'];
    this.registrationForm['borgerId'] = this.borgere[index]['id'];
  }

  test() {
    console.log(this.user);
  }

  registerTime() {
    this.registrationForm['userId'] = this.user['id'];
    //this.registrationForm['date'] = this.registrationForm['date'].toString();
    //console.log(this.registrationForm);
    console.log(this.registrationForm['date']);
    

    this.data.registerTime(this.registrationForm).subscribe((response) => {
      console.log(response);
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
