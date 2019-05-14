import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public cookieService: CookieService, public router: Router) { }

  ngOnInit() {
    this.cookieService.deleteAll();
  }

  logIn = (userType) => {
    if (userType == "admin") {
      this.cookieService.set('userType', userType);
      this.router.navigate(['/login'])
    }
    else if (userType == "student") {
      this.cookieService.set('userType', userType);
      this.router.navigate(['/login'])
    }
    else {
      this.cookieService.set('userType', userType);
      this.router.navigate(['/login']);
    }
  }

}
