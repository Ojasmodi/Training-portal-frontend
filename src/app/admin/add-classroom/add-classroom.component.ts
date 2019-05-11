import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TrainingManagementService } from 'src/app/training-management.service';
import { Router } from '@angular/router';
import { UserManagementService } from 'src/app/user-management.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-add-classroom',
  templateUrl: './add-classroom.component.html',
  styleUrls: ['./add-classroom.component.css']
})
export class AddClassroomComponent implements OnInit {

  public cno: any;
  public capacity: any;
  public authToken: any;

  constructor(public toastr: ToastrService, public cookieService: CookieService, public trainingManagement: TrainingManagementService, public appService: UserManagementService,
    public router: Router) { }

  ngOnInit() {
    this.authToken = this.cookieService.get('authtoken');
    this.checkStatus();
  }

  public checkStatus = () => {

    if(this.cookieService.get('authtoken') === undefined || this.cookieService.get('authtoken') === '' ||
      this.cookieService.get('authtoken') === null) {

      this.toastr.error("Please login first");
      this.router.navigate(['/']);

      return false;

    } else {

      return true;

    }

  } // end checkStatus

  public addClassroom(): any {
    if (!this.cno) {
      this.toastr.warning("Enter classroom number!")
    }
    else if (!this.capacity) {
      this.toastr.warning("Enter classroom capacity!")
    }
    else {
      let data = {
        classNumber: this.cno,
        capacity: this.capacity,
        authToken: this.authToken,
      }
      this.trainingManagement.addClassroom(data)
        .subscribe((apiResponse) => {
          console.log(apiResponse);

          if (apiResponse.status === 200) {

            this.toastr.success('Classroom added successfully!');

            setTimeout(() => {

              this.router.navigate(['/adminSection']);

            }, 1000);

          } else {

            this.toastr.error(apiResponse.message);

          }

        }, (err) => {

          this.toastr.error('Some error occured');

        });
    }
  }

  public logout(){

    this.appService.logout().subscribe((apiResponse) => {
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
