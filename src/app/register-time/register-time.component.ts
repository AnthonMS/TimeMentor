import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  @ViewChild('testTag') testTag: ElementRef;
  private user: Object;
  private borgere: Array<object> = [];
  private filteredBorgere: Array<object> = [];
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
    userId: null
  };

  private selectedBorger: Object;
  private comboboxMsg: string = "Vælg borger";
  private _borgerSearchTerm: string;
  get borgerSearchTerm(): string {
    return this._borgerSearchTerm;
  }
  set borgerSearchTerm(value: string) {
    this._borgerSearchTerm = value;
    this.filterBorgerlist();
  }

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
      //console.log(response);
      let resp = JSON.parse(response);
      resp.result[0].oldEmail = resp.result[0].email;
      this.user = resp.result[0];
      this.getBorgere();
    });
  }

  getBorgere() {
    this.data.getBorgere(this.user['companyId']).subscribe((response) => {
      let respObj = JSON.parse(response);
      if (respObj.success == true) {
        this.borgere = respObj.result;
        this.filteredBorgere = respObj.result;
      } else {
        this.borgere = [];
        this.filteredBorgere = [];
      }
    });
  }

  private filterBorgerlist() 
  {
    //console.log('filter borgere!');
    var tempSearch = this._borgerSearchTerm.toLowerCase();
    this.filteredBorgere = [];

    for (var q = 0; q < this.borgere.length; q++) 
    {
      //console.log(this.borgere[q]['name'].toLowerCase());
      var tempName = this.borgere[q]['name'].toLowerCase();

      if (tempName.includes(tempSearch)) {
        this.filteredBorgere.push(this.borgere[q]);
      }
    }
  }

  selectBorger(index) {
    this.selectedBorger = this.filteredBorgere[index];
    this.comboboxMsg = this.selectedBorger['name'];
    this.registrationForm['companyId'] = this.borgere[index]['companyId'];
    this.registrationForm['borgerId'] = this.borgere[index]['id'];
    this._borgerSearchTerm = "";
    this.filterBorgerlist();
  }

  deleteBorger() {
    console.log(this.selectedBorger);
    // Call service to delete borger from database
    let tmpObj = {
      borgerId: this.selectedBorger['id'],
      companyId: this.user['companyId']
    };

    this.data.deleteBorger(tmpObj).subscribe((response) => {
      let respObj = JSON.parse(response);
      if (respObj.success == true) {
        // SUCCESS
        this.getBorgere();
        this.selectedBorger = null;
        this.comboboxMsg = "Vælg borger";
        this._borgerSearchTerm = "";
      } else {
        // FAILURE
      }
    });
  }

  createBorger() {
    let tmpObj = {
      companyId: this.user['companyId'],
      name: this._borgerSearchTerm
    };

    this.data.createBorger(tmpObj).subscribe((response) => {
      let respObj = JSON.parse(response);
      if (respObj.success == true) {
        // SUCCESS
        this.getBorgere();
        this.selectedBorger = null;
        this.comboboxMsg = "Vælg borger";
        this._borgerSearchTerm = "";
      } else {
        // FAILURE
      }
    });
  }

  selectTime(index) {
    this.registrationForm['timeInterval'] = this.advancedIntervalArray[0][index];
    this.registrationForm['tmpTime'] = this.advancedIntervalArray[1][index];
  }

  test() {
    //console.log('test!');
    //this.testTag.nativeElement.focus();
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
