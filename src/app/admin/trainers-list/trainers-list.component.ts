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
    this.getAllTrainers();
  }

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

}
