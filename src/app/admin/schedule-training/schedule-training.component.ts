import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TrainingManagementService } from 'src/app/training-management.service';
import { Router } from '@angular/router';
import { UserManagementService } from 'src/app/user-management.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-schedule-training',
  templateUrl: './schedule-training.component.html',
  styleUrls: ['./schedule-training.component.css']
})
export class ScheduleTrainingComponent implements OnInit {

  public authToken: any;
  public classrooms = [];
  public trainers = [];
  public selectedTrainer;
  public selectedClass;
  public course="Java";
  public noOfStudents:number = 50;
  public MOP="June";

  constructor(public toastr: ToastrService, public cookieService: CookieService, public trainingManagement: TrainingManagementService, public appService: UserManagementService,
    public router: Router) { }

  ngOnInit() {
    this.authToken = this.cookieService.get('authToken');
    this.getAllClassrooms();
    this.getAllTrainers();

  }

  getAllClassrooms() {
    this.trainingManagement.getAllClassrooms()
      .subscribe((apiResponse) => {
        if (apiResponse.status === 200) {
          this.classrooms = apiResponse.data;
          console.log(this.classrooms);
          console.log("class found")
        }
        else {
          this.toastr.error("Some error occured");
          console.log("class not found")
        }
      })
  }

  getAllTrainers() {
    this.trainingManagement.getAllTrainers()
      .subscribe((apiResponse) => {
        if (apiResponse.status === 200) {
          this.trainers = apiResponse.data;
          console.log(this.trainers);
          console.log("trainers-found")
        }
        else {
          this.toastr.error("Some error occured");
          console.log("trainers not found")

        }
      })
  }

  addSchedule(){
    if(!this.noOfStudents)
    this.toastr.warning("Enter number of students !")
    else{
      console.log(this.selectedClass+" "+this.selectedTrainer+" "+this.noOfStudents+" "+this.MOP+" "+this.course)
    }

  }

}
