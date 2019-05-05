import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TrainingManagementService } from 'src/app/training-management.service';
import { Router } from '@angular/router';
import { UserManagementService } from 'src/app/user-management.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-add-trainer',
  templateUrl: './add-trainer.component.html',
  styleUrls: ['./add-trainer.component.css']
})
export class AddTrainerComponent implements OnInit {

  public status = ['Yes', 'No'];
  public inJuly = 'No';
  public inJune = 'No';
  public inMay = 'No';
  public C = 'No';
  public Java = 'No';
  public Android = 'No';
  public authToken;
  public tname: string;
  public age: number;
  public experience: number;
  public contactno: number;
  public emailid: string;



  constructor(public toastr: ToastrService, public cookieService: CookieService, public trainingManagement: TrainingManagementService, public appService: UserManagementService,
    public router: Router) { }

  ngOnInit() {
    this.authToken = this.cookieService.get('authtoken');
  }

  public addTrainer() {

    if (!this.tname){
      this.toastr.warning("Enter name of trainer");
    }
    else if (!this.age){
      this.toastr.warning("Enter age");
    }
    else if (!this.experience){
      this.toastr.warning("Enter experience");
    }
    else if (!this.contactno){
      this.toastr.warning("Enter contact no");
    }
    else if (!this.emailid){
      this.toastr.warning("Enter emailid");
    }
    else {

      let data = {
        name: this.tname,
        age: this.age,
        experience: this.experience,
        contactno: this.contactno,
        knowsJava: this.Java,
        knowsC: this.C,
        knowsAndroid: this.Android,
        mayAvailable: this.inMay,
        juneAvailable: this.inJune,
        julyAvailable: this.inJuly,
        email: this.emailid,
        authToken: this.authToken,
      }
      this.trainingManagement.addTrainer(data)
        .subscribe((apiResponse) => {
          if (apiResponse.status === 200) {
            this.toastr.success("Trainer successfully added.")
            setTimeout(() => {
              this.router.navigate(['/adminSection'])
            }, 1000)
          }
          else {
            this.toastr.error(apiResponse.message);
          }
        },
          (err) => {
            this.toastr.error("Maybe Network problem", "Some error occcured")
          });
    }
  }



}
