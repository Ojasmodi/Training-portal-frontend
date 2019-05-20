import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TrainingManagementService } from 'src/app/training-management.service';
import { Router } from '@angular/router';
import { UserManagementService } from 'src/app/user-management.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-training-calender',
  templateUrl: './training-calender.component.html',
  styleUrls: ['./training-calender.component.css']
})
export class TrainingCalenderComponent implements OnInit {

  public authToken;
  public schedules: [];
  public userName;
  public userType;

  constructor(public toastr: ToastrService, public cookieService: CookieService, public trainingManagement: TrainingManagementService, public appService: UserManagementService,
    public router: Router) { }

  ngOnInit() {
    this.authToken = this.cookieService.get('authToken');
    this.userName =this.cookieService.get('userName');
    this.userType=this.cookieService.get('userType');
    this.checkStatus();
    this.getAllSchedules();
  }

  public checkStatus = () => {

    if (this.cookieService.get('authtoken') === undefined || this.cookieService.get('authtoken') === '' ||
      this.cookieService.get('authtoken') === null) {

      this.toastr.error("Please login first");
      this.router.navigate(['/']);

      return false;

    } else {

      return true;

    }

  } // end checkStatus

  getAllSchedules() {
    this.trainingManagement.getAllSchedules()
      .subscribe((apiResponse) => {
        if (apiResponse.status === 200) {
          this.schedules = apiResponse.data;
          console.log(this.schedules);
        }
        else {
          this.toastr.error(apiResponse.message);
        }
      },
        (err) => {
          this.toastr.error(err.message);
        }
      )
  }

  deleteSchedule(schedule) {

    let data = {
      trainer: schedule.trainer,
      classNumber: schedule.classNumber,
      mop: schedule.mop
    }

    this.trainingManagement.deleteSchedule(data).subscribe((apiResponse) => {
      if (apiResponse.status === 200) {
        this.toastr.success("Schedule deleted successfully !");
        setTimeout(() => {
          this.router.navigate(['/adminSection']);
        }, 1000);
      }
      else {
        this.toastr.error(apiResponse.message);
      }
    },
      (err) => {
        this.toastr.error(err.message);
      }
    )
  }

  public logout() {

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
