import { Component, OnInit } from '@angular/core';
import { UserManagementService } from 'src/app/user-management.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tutorials',
  templateUrl: './tutorials.component.html',
  styleUrls: ['./tutorials.component.css']
})
export class TutorialsComponent implements OnInit {
  public userName;

  constructor(public AppService: UserManagementService,
    public router: Router,
    private cookieService: CookieService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.userName = this.cookieService.get('userName')
  }
  public logout() {

    this.AppService.logout().subscribe((apiResponse) => {
      if (apiResponse.status === 200) {
        this.cookieService.delete('authtoken');
        this.cookieService.delete('userId');
        this.cookieService.delete('userName');
        this.toastr.success("Logged out successfully")
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
