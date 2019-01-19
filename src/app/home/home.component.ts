import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

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

  getRegistrations() {
    this.data.getMyRegistrations(this.user['id']).subscribe((response) => {
      let resp = JSON.parse(response);
      this.timeRegs = resp.result;
      this.filteredTimeRegs = resp.result;
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
      //console.log(response);
      this.downloadBlob(response);
      //let resp = JSON.parse(response);
      //this.timeRegs = resp.result;
      //this.filteredTimeRegs = resp.result;
      //var file = this.blobToFile(response, "test.xls");
      //var file = new File([response], "test.xls");
      //console.log(file);
      //let url = window.URL.createObjectURL(response);
      //let dlBtn = document.getElementById('downloadExcel');
      
    });
  }

  private downloadBlob(data: any): void {
    const blob: Blob = data;
    const fileName: string = "test-file.xls";
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

}
