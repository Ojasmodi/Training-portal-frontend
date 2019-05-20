import { Component, OnInit } from '@angular/core';
import { UserManagementService } from 'src/app/user-management.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-admin-section',
  templateUrl: './admin-section.component.html',
  styleUrls: ['./admin-section.component.css']
})
export class AdminSectionComponent implements OnInit {

  public authToken: any;
  public userInfo: any;
  public userId: any;
  public userName: any;
  public userType: any;

  constructor(public AppService: UserManagementService,
    public router: Router,
    private cookieService: CookieService,
    private toastr: ToastrService
  ) {

    this.userId = this.cookieService.get('userId');
    this.userType = this.cookieService.get('userType');
    this.userName = this.cookieService.get('userName');
  }

  ngOnInit() {
    this.authToken = this.cookieService.get('authtoken');

    this.userInfo = this.AppService.getUserInfoFromLocalStorage();

    this.checkStatus();
  }

  public checkStatus = () => {

    if (this.cookieService.get('authtoken') === undefined || this.cookieService.get('authtoken') === '' ||
      this.cookieService.get('authtoken') === null) {

      this.toastr.error("Please login first.");
      this.router.navigate(['/']);

      return false;

    } else {

      return true;

    }

  } // end checkStatus

  public logout() {

    this.AppService.logout().subscribe((apiResponse) => {
      if (apiResponse.status === 200) {
        this.cookieService.delete('authtoken');
        this.cookieService.delete('userId');
        this.cookieService.delete('userName');
        this.toastr.success("Logged out successfully.")
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1000)
      }
      else {
        this.toastr.error(apiResponse.message);
      }
    },
      (err) => {
        this.toastr.error(err.message);
      })
  }
}
