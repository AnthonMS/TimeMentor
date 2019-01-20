import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DataService } from '../data.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private loggedIn: Boolean = false;
  private advFilterExpanded: Boolean = false;
  private user: Object;
  private timeRegs: Array<object>;
  private filteredTimeRegs: Array<object>;
  datePickerConfig: Partial<BsDatepickerConfig>;
  private advFilter: Object = {
    periodStart: null,
    periodEnd: null
  };

  private _activitySearch: string;
  get activitySearch(): string {
    return this._activitySearch;
  }
  set activitySearch(value: string) {
    this._activitySearch = value;
    this.filterTimeReglist();
    //console.log(value);
  }

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
    //this.getUser();
    if (!this.cookieService.check('token')) {
      //this.router.navigate(['']);
      this.loggedIn = false;
    } else {
      this.loggedIn = true;
      this.getUser();
    }
  }

  ngAfterViewInit() {
    /*if (this.loggedIn) {
      this.createColumnChart();
    }*/
  }

  test() {
    console.log('test');
  }

  expand() {
    this.advFilterExpanded = !this.advFilterExpanded;
    this._activitySearch = "";
    this.filterTimeReglist();
  }

  getUser() {
    this.data.getUserWithToken(this.cookieService.get('token')).subscribe((response) => {
      //console.log(response);
      let resp = JSON.parse(response);
      resp.result[0].oldEmail = resp.result[0].email;
      this.user = resp.result[0];

      this.getRegistrations();
    });
  }

  /* --- Latest activity --- */
  getRegistrations() {
    this.data.getMyRegistrations(this.user['id']).subscribe((response) => {
      let resp = JSON.parse(response);
      this.timeRegs = resp.result;
      this.filteredTimeRegs = resp.result;
      this.createColumnChart();

      //console.log(this.timeRegs);
    });
  }

  private filterTimeReglist() {
    var tempSearch = this._activitySearch.toLowerCase();
    this.filteredTimeRegs = [];

    for (var q = 0; q < this.timeRegs.length; q++) {
      var tempName = this.timeRegs[q]['borgerName'].toLowerCase();
      var tempTime = this.timeRegs[q]['time'];
      var tempStatus = this.timeRegs[q]['status'].toLowerCase();
      var tempDate = this.timeRegs[q]['date'];
      var tempCreateDate = this.timeRegs[q]['create_date'];

      if (tempName.includes(tempSearch)) {
        this.filteredTimeRegs.push(this.timeRegs[q]);
      }
      else if (tempStatus.includes(tempSearch)) {
        this.filteredTimeRegs.push(this.timeRegs[q]);
      } else if (tempDate.includes(tempSearch)) {
        this.filteredTimeRegs.push(this.timeRegs[q]);
      } else if (tempCreateDate.includes(tempSearch)) {
        this.filteredTimeRegs.push(this.timeRegs[q]);
      }
    }
  }

  private checkAdvFilter() {
    let rtnVal = true;

    if (this.advFilter['periodStart'] !== null && this.advFilter['periodEnd'] !== null) {
      rtnVal = false;
    }

    return rtnVal;
  }

  private advancedTimeRegFilter() {
    console.log(this.advFilter);
    var tmpStartDate = this.advFilter['periodStart'];
    var tmpEndDate = this.advFilter['periodEnd'];
    this.filteredTimeRegs = [];

    for (var q = 0; q < this.timeRegs.length; q++) {
      var tmpTimeRegDate = new Date(this.timeRegs[q]['date']);
      if (tmpTimeRegDate.getTime() > tmpStartDate.getTime() && tmpTimeRegDate.getTime() < tmpEndDate.getTime()) {
        this.filteredTimeRegs.push(this.timeRegs[q]);
      }
    }

  }

  private downloadExcel() {
    this.data.downloadMyActivity(this.filteredTimeRegs).subscribe((response) => {
      this.downloadBlob(response); // Response is a blob
    });
  }

  private downloadBlob(data: any): void {
    const blob: Blob = data;
    const fileName: string = "test-file.xml";
    const objectUrl: string = URL.createObjectURL(blob);
    const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;

    a.href = objectUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(objectUrl);
  }

  public blobToFile = (theBlob: Blob, fileName: string): File => {
    var b: any = theBlob;
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    b.lastModifiedDate = new Date();
    b.name = fileName;

    //Cast to a File() type
    return <File>theBlob;
  }

  /* --- Diagram 1 --- */
  private createColumnChart() {
    let today = new Date();
    let day1 = new Date(today.getTime() - (6 * 24 * 60 * 60 * 1000));
    let day2 = new Date(today.getTime() - (5 * 24 * 60 * 60 * 1000));
    let day3 = new Date(today.getTime() - (4 * 24 * 60 * 60 * 1000));
    let day4 = new Date(today.getTime() - (3 * 24 * 60 * 60 * 1000));
    let day5 = new Date(today.getTime() - (2 * 24 * 60 * 60 * 1000));
    let day6 = new Date(today.getTime() - (1 * 24 * 60 * 60 * 1000));
    let chartLabels = [
      this.createLabel(day1),
      this.createLabel(day2),
      this.createLabel(day3),
      this.createLabel(day4),
      this.createLabel(day5),
      this.createLabel(day6),
      this.createLabel(today)
    ];
    let bgColor = ['rgba(75, 192, 192, 0.3)', 'rgba(75, 192, 192, 0.3)', 'rgba(75, 192, 192, 0.3)', 'rgba(75, 192, 192, 0.3)', 'rgba(75, 192, 192, 0.3)', 'rgba(75, 192, 192, 0.3)', 'rgba(75, 192, 192, 0.3)'];
    let bColor = ['rgba(75, 192, 192, 1)', 'rgba(75, 192, 192, 1)', 'rgba(75, 192, 192, 1)', 'rgba(75, 192, 192, 1)', 'rgba(75, 192, 192, 1)', 'rgba(75, 192, 192, 1)', 'rgba(75, 192, 192, 1)'];

    var canvas = <HTMLCanvasElement>document.getElementById("chart");
    var ctx = canvas.getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: chartLabels,
        datasets: [{
          label: 'Timer registreret',
          data: [
            this.getHoursOnDate(day1), this.getHoursOnDate(day2), 
            this.getHoursOnDate(day3), this.getHoursOnDate(day4), 
            this.getHoursOnDate(day5), this.getHoursOnDate(day6), 
            this.getHoursOnDate(today)
          ],
          backgroundColor: bgColor,
          borderColor: bColor,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  private createLabel(date: any): any {
    let rtnVal:string = "Date Test";

    if (date.getDay() == 0) {
      rtnVal = "Søn. ";
    } else if (date.getDay() == 1) {
      rtnVal = "Man. ";
    } else if (date.getDay() == 2) {
      rtnVal = "Tir. ";
    } else if (date.getDay() == 3) {
      rtnVal = "Ons. ";
    } else if (date.getDay() == 4) {
      rtnVal = "Tor. ";
    } else if (date.getDay() == 5) {
      rtnVal = "Fre. ";
    } else if (date.getDay() == 6) {
      rtnVal = "Lør. ";
    }
    rtnVal += date.getDate() + "/" + date.getMonth()+1;

    return rtnVal;
  }

  private getHoursOnDate(date: any): any {
    let rtnVal:any = 0;
    //console.log(new Date(this.timeRegs[0]['date']));

    for (var i = 0; i < this.timeRegs.length; i++) {
      let regDate:Date = new Date(this.timeRegs[i]['date']);
      //console.log(regDate.getFullYear());
      if (date.getFullYear() == regDate.getFullYear()) { // Check if year is the same
        if (date.getMonth() == regDate.getMonth()) { // Check if month is the same
          if (date.getDay() == regDate.getDay()) { // Check if day is the same

            //console.log(this.timeRegs[i]['time']);
            rtnVal += this.timeRegs[i]['time'];

          }
        }
      }
    }

    return Math.floor(rtnVal / 60);
  }

}
