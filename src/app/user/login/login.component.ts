import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserManagementService } from 'src/app/user-management.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public userType: string;
  public email: string;
  public password: string;
  public forget_email: string;
  public toggle:boolean=false;

  constructor(public _route: ActivatedRoute, public router: Router, private toastr: ToastrService,
    private appService: UserManagementService, private cookieService: CookieService) {
  }

  ngOnInit() {
  }

  resetPassword() {
    if (!this.forget_email) {
      this.toastr.warning("Email field can't be blank!")
    }
    else {
      this.toastr.show("Please wait...","Processing your request")
      let data = {
        email: this.forget_email
      }

      this.appService.resetPassword(data)
        .subscribe((apiResponse) => {

          if (apiResponse['status'] === 200) {
            console.log(apiResponse);
            //this.toggle=!this.toggle;
            this.toastr.success("Please login again.", "Your password has been sent to your registered email");
            setTimeout(() => {
              this.router.navigate(['/home']);
            }, 0);

          } else if (apiResponse['status'] === 404) {
            this.toastr.error(apiResponse['message']);
          }
          else {
            this.toastr.error(apiResponse['message']);
          }
        }, (err) => {
          this.toastr.error('Some error occured')
        });

    } // end condition
  }

  logIn = (userType) => {
    this.cookieService.deleteAll();
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

  public signin() {

    if (!this.email) {
      this.toastr.warning('enter email')


    } else if (!this.password) {

      this.toastr.warning('enter password')


    } else {

      let data = {
        email: this.email,
        password: this.password
      }

      this.appService.signinFunction(data)
        .subscribe((apiResponse) => {

          if (apiResponse.status === 200) {
            console.log(apiResponse)

            this.cookieService.set('authtoken', apiResponse.data.authToken);

            this.cookieService.set('userId', apiResponse.data.userDetails.userId);

            this.cookieService.set('userName', apiResponse.data.userDetails.firstName + ' ' + apiResponse.data.userDetails.lastName);

            this.appService.setUserInfoInLocalStorage(apiResponse.data.userDetails)

            this.toastr.success("Taking you to the desired section", 'Login Successful');
            setTimeout(() => {
              this.router.navigate(['/adminSection']);
            }, 2000);

          } else {

            this.toastr.error(apiResponse.message)


          }

        }, (err) => {
          this.toastr.error('Some error occured')

        });

    } // end condition

  } // end signinFunction


}
