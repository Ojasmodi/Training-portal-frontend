import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserManagementService } from 'src/app/user-management.service';
import { DiscussionBoardService } from 'src/app/discussion-board.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-discussion-board',
  templateUrl: './discussion-board.component.html',
  styleUrls: ['./discussion-board.component.css']
})
export class DiscussionBoardComponent implements OnInit {

  public discussions = [];
  public hasQuestion = true;
  public authToken;
  public userInfo;
  public disconnectedSocket = true;
  public topic: string;
  public details: string;

  constructor(public cookieService: CookieService, public userManagement: UserManagementService,
    public dissBoard: DiscussionBoardService, public router: Router) { }

  ngOnInit() {
    this.authToken = this.cookieService.get('authtoken');

    this.userInfo = this.userManagement.getUserInfoFromLocalStorage();

    this.checkStatus();

    this.verifyUserConfirmation();
    this.getallDiscussions();
    this.getPreviousDiscussions();
  }

  public checkStatus: any = () => {

    if (this.cookieService.get('authtoken') === undefined ||
      this.cookieService.get('authtoken') === '' || this.cookieService.get('authtoken') === null) {

      this.router.navigate(['/']);

      return false;

    } else {

      return true;

    }

  } // end checkStatus



  public verifyUserConfirmation: any = () => {

    this.dissBoard.verifyUser()
      .subscribe((data) => {

        this.disconnectedSocket = false;

        this.dissBoard.setUser(this.authToken);
        //this.getallDiscussions();

      });
  }

  create() {
    this.hasQuestion = false;
  }

  getPreviousDiscussions=()=>{

    this.dissBoard.getPreviousDiscussions().subscribe((apiResponse) => {

      console.log("inside getpreviousdiscusiion");
      console.log(apiResponse);
      if(apiResponse['status']==200)
      for(let data of apiResponse['data']){
      let diss = {
          discussionId: data['discussionId'],
          topic: data['topic'],
          details: data['details'],
          views: data['views'],
          createdBy: data['createdBy'],
          replies: data['replies'],
          userId_of_creator: data['userId_of_creator'],
          createdOn: data['createdOn']
        }
        this.discussions.push(diss);
      }
      //
      
    })

  }
     

  getallDiscussions = () => {

    console.log("getAllDiss called");

    this.dissBoard.getallDiscussions().subscribe((data) => {

      console.log("inside socket");
      console.log(data);
      let diss = {
          discussionId: data.discussionId,
          topic: data['topic'],
          details: data['details'],
          views: data['views'],
          createdBy: data['createdBy'],
          replies: data['replies'],
          userId_of_creator: data['userId_of_creator'],
          createdOn: data['createdOn']
        }
        this.discussions.push(diss);
      //
      
    })

  }

  saveDiscussion = () => {

    let data = {
      topic: this.topic,
      details: this.details,
      createdOn: Date.now(),
      createdBy: this.cookieService.get('userName'),
      views: 0,
      userId_of_creator: this.cookieService.get('userId')

    }
    this.dissBoard.saveDiscussion(data);
    this.topic=""
    this.details=""
    //this.getallDiscussions();
  }

}
