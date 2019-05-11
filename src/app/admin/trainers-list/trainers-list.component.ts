import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TrainingManagementService } from 'src/app/training-management.service';
import { Router } from '@angular/router';
import { UserManagementService } from 'src/app/user-management.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-trainers-list',
  templateUrl: './trainers-list.component.html',
  styleUrls: ['./trainers-list.component.css']
})
export class TrainersListComponent implements OnInit {
  public authToken;
  public trainers: [];

  constructor(public toastr: ToastrService, public cookieService: CookieService, public trainingManagement: TrainingManagementService, public appService: UserManagementService,
    public router: Router) { }

  ngOnInit() {
    this.authToken = this.cookieService.get('authToken');
    this.checkStatus();
    this.getAllTrainers();
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

  getAllTrainers() {
    this.trainingManagement.getAllTrainers()
      .subscribe((apiResponse) => {
        if (apiResponse.status === 200) {
          this.trainers = apiResponse.data;
          console.log(this.trainers);
        }
        else {
          this.toastr.error("Some error occured");
        }
      })
  }

  deleteTrainer(id) {

    this.trainingManagement.deleteTrainer(id).subscribe((apiResponse) => {
      if (apiResponse.status === 200) {
        this.toastr.success("Trainer deleted successfully !");
        setTimeout(() => {
          this.router.navigate(['/trainersList']);
        }, 1000);
      }
      else{
        this.toastr.error(apiResponse.message);
      }
    },
      (err) => {
        this.toastr.error(err.message);
      }
    )
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
