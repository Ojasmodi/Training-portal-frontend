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

  constructor(public _route: ActivatedRoute, public router: Router, private toastr: ToastrService,
    private appService: UserManagementService, private cookieService: CookieService) {
  }

  ngOnInit() {
    this.userType = this._route.snapshot.paramMap.get('userType');

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

            if (this.userType === 'admin') {
              this.toastr.success("Taking you to the Admin section",'Login Successful');
              setTimeout(()=>{
                this.router.navigate(['/adminSection']);
              },2000);
            }
            else if (this.userType === 'trainer') {
              this.router.navigate(['/trainer']);
            }
            else {
             this.router.navigate(['/student']);
            }

          } else {

            this.toastr.error(apiResponse.message)


          }

        }, (err) => {
          this.toastr.error('Some error occured')

        });

    } // end condition

  } // end signinFunction


}
