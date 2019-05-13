import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserManagementService } from 'src/app/user-management.service';
import { DiscussionBoardService } from 'src/app/discussion-board.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
  public hasReplies = true;
  public replyMsg: string;
  public selectedDiscussion: any;
  public userName: string;
  public replyDiscussion: any;
  public userId;

  constructor(public cookieService: CookieService, public userManagement: UserManagementService,
    public dissBoard: DiscussionBoardService, public router: Router, public toastr: ToastrService) { }

  ngOnInit() {
    this.authToken = this.cookieService.get('authtoken');

    this.userInfo = this.userManagement.getUserInfoFromLocalStorage();
    this.userName = this.cookieService.get('userName');
    this.userId = this.cookieService.get('userId');
    this.checkStatus();
    this.verifyUserConfirmation();
    this.getaDiscussions();
    this.getPreviousDiscussions();
    this.getReply();
    this.getDeletedDiscussion();
    this.disconnectedsocket();
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

  disconnectedsocket=()=>{
      this.dissBoard.disconnectedSocket().subscribe(()=>{
        this.toastr.error("Connection-lost",'Trying to connect...');
      })
  }

  create() {
    this.hasQuestion = !this.hasQuestion;
  }

  view(id) {
    //console.log(this.selectedDiscussion)
    for (let d of this.discussions) {
      if (d.discussionId === id) {
        if (d.discussionisOpen) {
          d.discussionisOpen = false;
          this.selectedDiscussion = undefined;
        }
        else {
          d.discussionisOpen = true;
          this.selectedDiscussion = d;
        }
      }
      else {
        d.discussionisOpen = false;
      }
    }
    //console.log("selected discussion "+this.selectedDiscussion)
  }

  getReply = () => {
    this.dissBoard.getreply().subscribe((data) => {

      console.log("selected discussion " + this.selectedDiscussion)
      console.log(data)
      if (this.selectedDiscussion == null || this.selectedDiscussion == undefined) {
        for (let d of this.discussions) {
          if (d.discussionId == data.discussionId) {
            //this.discussionToAddReply = d;
            let datam = {
              replyBy: data.replyBy,
              replyCreatedOn: data.replyCreatedOn,
              replyId: data.replyId,
              replyMsg: data.replyMsg,
              userid_of_replier: data.userid_of_replier
            }
            if (d.replies == null) {
              d.replies = [];
            } 
            d.replies.push(datam);
            break;
          }
        }
      }
      else if (this.selectedDiscussion.discussionId == data.discussionId) {
        if (this.selectedDiscussion.replies == null) {
          this.selectedDiscussion.replies = [];
        }
        this.selectedDiscussion.replies.push(data);
      }
      else {
        for (let d of this.discussions) {
          if (d.discussionId == data.discussionId) {
            //this.discussionToAddReply = d;
            let datam = {
              replyBy: data.replyBy,
              replyCreatedOn: data.replyCreatedOn,
              replyId: data.replyId,
              replyMsg: data.replyMsg,
              userid_of_replier: data.userid_of_replier
            }
            if (d.replies == null) {
              d.replies = [];
            } 
            d.replies.push(datam);
            break;
          }
        }
      }
      for (let d of this.discussions) {
        if (d.discussionId == data.discussionId) {
          this.replyDiscussion = d; 
          break;
        }
      }//golumodi ==golumodi golumodi==d.created by replu.createdby!=reply
      if (data.userid_of_replier!=this.replyDiscussion.userId_of_creator && this.userId==this.replyDiscussion.userId_of_creator  ) {
        this.toastr.info(`You got a reply on your discussion by ${data.replyBy}`, data.replyMsg);
      }
    })
  }

  getPreviousDiscussions = () => {

    this.dissBoard.getPreviousDiscussions().subscribe((apiResponse) => {
      console.log("inside getpreviousdiscusiion");
      console.log(apiResponse);
      if (apiResponse['status'] == 200) {
        for (let data of apiResponse['data']) {
          let diss = {
            discussionisOpen: false,
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
        if (!this.discussions) {
          this.toastr.info("No discussions found");
        }
      }
    })
  }

  getaDiscussions = () => {

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
      if(data.userId_of_creator!=this.cookieService.get('userId')){
      this.toastr.info(`${data.createdBy} created a new discussion ${data.topic}`)
      }
      this.discussions.push(diss);
      //
    })

  }

  saveDiscussion = () => {

    if (!this.topic) {
      this.toastr.warning("Enter topic of the discussion!")
    }
    else if (!this.details) {
      this.toastr.warning("Enter details of the discussion!")
    }
    else {
      let data = {
        topic: this.topic,
        details: this.details,
        createdOn: Date.now(),
        createdBy: this.cookieService.get('userName'),
        views: 0,
        userId_of_creator: this.cookieService.get('userId')
      }
      this.dissBoard.saveDiscussion(data);
      this.topic = ""
      this.details = ""
      //this.getallDiscussions();
      this.toastr.success(`Your discussion has been added successfully.`);
      this.hasQuestion = true;
    }
  }

  addReply = (discussion) => {
    if (!this.replyMsg) {
      this.toastr.warning("Enter reply message first!")
    }
    else {
      let data = {
        discussionId: discussion.discussionId,
        replyBy: this.cookieService.get('userName'),
        replyMsg: this.replyMsg,
        userid_of_replier: this.cookieService.get('userId'),
        replyCreatedOn: Date.now()
      }
      this.toastr.success(`Your reply has been added successfully.`);
      this.dissBoard.addReply(data);
      this.replyMsg = '';
    }
  }

  getDeletedDiscussion = () => {

    this.dissBoard.getDeletedDiscussion().subscribe((data) => {
      console.log(data);
      if(this.cookieService.get('userId')!=data.userId_of_creator){
      this.toastr.info(`Discussion ${data.topic} is deleted by ${data.createdBy}.`)
      }
      else{
        this.toastr.success("Discussion deleted successfully.")
      }
      for (let d of this.discussions) {
        if (d.discussionId === data.discussionId) {
          var removeIndex = this.discussions.map(function (discussion) { return discussion.discussionId; }).indexOf(d.discussionId);
          this.discussions.splice(removeIndex, 1)
          //this.discussions.splice(this.discussions.indexOf(d))
        }
      }
    })
  }

  deleteDiscussion = (discussion) => {
    this.dissBoard.deleteDiscussion(discussion);
  }

  public logout(){

    this.userManagement.logout().subscribe((apiResponse) => {
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
