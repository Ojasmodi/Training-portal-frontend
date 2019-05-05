import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-classroom',
  templateUrl: './add-classroom.component.html',
  styleUrls: ['./add-classroom.component.css']
})
export class AddClassroomComponent implements OnInit {

  public cno:any;
  public capacity:any;
  
  constructor(public toastr:ToastrService) { }

  ngOnInit() {
  }

  public addClassroom(): any
  {
     if(!this.cno){
       this.toastr.warning("Enter classroom number!")
     }
     else if(!this.capacity){
      this.toastr.warning("Enter classroom capacity!")
     }
     else{
       this.toastr.info("hi"); 
     }
  }

}
