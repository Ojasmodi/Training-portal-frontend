import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserManagementService } from 'src/app/user-management.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public firstName: any;
  public lastName: any;
  public mobile: any;
  public email: any;
  public password: any;

  constructor(
    public appService: UserManagementService,
    public router: Router,
    private toastr: ToastrService,
    public cookieService: CookieService) {
  }

  ngOnInit() {
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

  public goToSignIn: any = () => {

    this.router.navigate(['/']);

  } // end goToSignIn

  public signupFunction: any = () => {

    if (!this.firstName) {
      this.toastr.warning('Enter first name.')


    } else if (!this.lastName) {
      this.toastr.warning('Enter last name.')

    } else if (!this.mobile) {
      this.toastr.warning('Enter mobile.')

    } else if (!this.email) {
      this.toastr.warning('Enter email.')

    } else if (!this.password) {
      this.toastr.warning('Enter password.')


    } else {

      const data = {
        firstName: this.firstName,
        lastName: this.lastName,
        mobile: this.mobile,
        email: this.email,
        password: this.password,
      };

      console.log(data);

      this.appService.signupFunction(data)
        .subscribe((apiResponse) => {

          console.log(apiResponse);

          if (apiResponse.status === 200) {

            this.toastr.success('Signup successful!');

            setTimeout(() => {

              this.goToSignIn();

            }, 2000);

          } else {

            this.toastr.error(apiResponse.message);

          }

        }, (err) => {

          this.toastr.error('Some error occured.');

        });

    } // end condition

  } // end signupFunction

}
