import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-testc',
  templateUrl: './testc.component.html',
  styleUrls: ['./testc.component.css']
})
export class TestcComponent implements OnInit {

  pageName = '';
  number = '';
  flag = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private titleService: Title 
  ) {
    this.route.queryParams.subscribe(params => {
      this.pageName = params['user'];
      this.getInfo(this.pageName);
    });

  }

  userObj: any = {};

  getInfo(company) {
    this.titleService.setTitle('Tejas test');
    this.http.get('http://www.thetechyway.com/company_api/public/api/company/single/' + company).subscribe((res: any) => {
      if (res.status == '200') {
        this.userObj = { ...res.data };
        
      }
      console.log(res);
    });
  }

  share() {
    if (this.number.length == 0) {
      this.flag = true;
      setTimeout(() => {
        this.flag = false;
      }, 2000);
      return;
    }
    window.location.href = "whatsapp://send?phone=91" + this.number + "&text=" + window.location.href;
    // console.log("whatsapp://send?phone=91" + this.number + "&text=" + window.location.href);
  }

  ngOnInit() {
    
  }

}
