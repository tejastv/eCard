import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Title, Meta } from '@angular/platform-browser';
import { trigger, style, animate, transition } from '@angular/animations';
import { DomSanitizer } from '@angular/platform-browser';

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
  gallarires = [];
  activeClass = { 'media_desc': 'All', 'media_type': null };

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private titleService: Title,
    private meta: Meta,
    public sanitizer: DomSanitizer
  ) {
    this.route.queryParams.subscribe(params => {
      this.pageName = params['user'];
      this.getInfo(this.pageName);
    });
  }

  getInfo(company) {
    this.titleService.setTitle('Tejas test');
    this.meta.addTag({ name: 'keywords', content: 'Angular Project, Create Angular Project' });
    this.meta.addTag({ name: 'description', content: 'Angular project training on rsgitech.com' });
    this.meta.addTag({ name: 'author', content: 'rsgitech' });
    this.meta.addTag({ name: 'robots', content: 'index, follow' });
    this.http.get('http://www.thetechyway.com/company_api/public/api/company/single/' + company).subscribe((res: any) => {
      if (res.status == '200') {
        this.userObj = { ...res.data };
        if (res.data.gallery_categories.length > 0) {
          res.data.gallery_categories.forEach(element => {
            this.getGallary(element);
          });
        }
      } else {
      }
      console.log(res);
    });
  }

  getGallary(catId) {
    this.http.get('http://www.thetechyway.com/company_api/public/api/company/gallery/media/' + this.userObj.slug + '/' + catId.id).subscribe((res: any) => {
      if (res.status == '200') {
        res.data.unshift({ 'media_desc': 'All', 'media_type': null });
        this.userObj['gallary'] = res.data;
        this.gallarires = [...this.userObj['gallary']];
        console.log(this.userObj);
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

  filterCat(obj) {
    console.log(obj);
    this.activeClass = obj;
    if (obj.media_desc == "All") {
      this.gallarires = JSON.parse(JSON.stringify(this.userObj['gallary']))
    } 
    else this.gallarires = this.userObj['gallary'].filter(user => user.media_desc.toLowerCase().includes(obj.media_desc.toLowerCase()))
    console.log(this.gallarires);
  }

  ngOnInit() {
  }

}
