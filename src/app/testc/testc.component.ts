import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Title, Meta } from '@angular/platform-browser';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-testc',
  templateUrl: './testc.component.html',
  styleUrls: ['./testc.component.css']
})
export class TestcComponent implements OnInit {

  pageName = '';
  number = '';
  flag = false;
  preloader = true;
  userObj: any = {};

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private titleService: Title,
    private meta: Meta
  ) {
    this.route.queryParams.subscribe(params => {
      this.pageName = params['user'];
      this.getInfo(this.pageName);
    });
  }

  getInfo(company) {
    this.titleService.setTitle('Tejas test');
  	this.meta.addTag({name: 'keywords', content: 'Angular Project, Create Angular Project'});
    this.meta.addTag({name: 'description', content: 'Angular project training on rsgitech.com'});
    this.meta.addTag({name: 'author', content: 'rsgitech'});
    this.meta.addTag({name: 'robots', content: 'index, follow'});
    this.http.get('http://www.thetechyway.com/company_api/public/api/company/single/' + company).subscribe((res: any) => {
      if (res.status == '200') {
        this.userObj = { ...res.data };
      } else {
      }
      console.log(res);
    });
  }

  shareDirect() {
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    if (w < 768) {
      window.open("whatsapp://send?phone=91" + this.userObj.contact + "&text=" + window.location.href, '_blank');
    } else {
      window.open("https://api.whatsapp.com/send?phone=91" + this.userObj.contact + "&text=" + window.location.href);
    }
  }

  share() {
    if (this.number.length == 0) {
      this.flag = true;
      setTimeout(() => {
        this.flag = false;
      }, 2000);
      return;
    }
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    if (w < 768) {
      window.open("whatsapp://send?phone=91" + this.number + "&text=" + window.location.href);
    } else {
      window.open("https://api.whatsapp.com/send?phone=91" + this.number + "&text=" + window.location.href);
    }
  }

  ngOnInit() {
  }

}
