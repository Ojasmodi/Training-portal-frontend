import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';

import {Observable} from 'rxjs';
import {tap, catchError} from 'rxjs/Operators';

import {HttpClient} from '@angular/common/http';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class DiscussionBoardService {

  private url="http://localhost:3000";
  private socket;

  constructor(public http: HttpClient, public cookieService: CookieService) {
    // connection is being created.
    // that handshake
    this.socket = io(this.url);

  }

  public verifyUser=()=>{

    return Observable.create((observer)=>{
      this.socket.on('verifyUser',(data)=>{
        observer.next(data);
      })
    })
  }

  public getPreviousDiscussions=()=>{

    return this.http.get(`${this.url}/api/v1/discussion/discussions/all`);
  }

  public getallDiscussions=()=>{

    return Observable.create((observer)=>{
      this.socket.on('get-discussion',(data)=>{
        console.log("on is called");
        observer.next(data);
      })
    })
  }

  public disconnectedSocket = () => {

    return Observable.create((observer) => {

      this.socket.on("disconnect", () => {

        observer.next();

      }); // end Socket

    }); // end Observable
  }

  public setUser = (authToken) => {

    this.socket.emit("set-user", authToken);

  } // end setUser

  public saveDiscussion = (data) =>{

    this.socket.emit('discussion', data);
  }

  public exitSocket = () =>{


    this.socket.disconnect();


  }// end exit socket

  private handleError(err: HttpErrorResponse) {

    let errorMessage = '';

    if (err.error instanceof Error) {

      errorMessage = `An error occurred: ${err.error.message}`;

    } else {

      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;

    } // end condition *if

    console.error(errorMessage);

    return Observable.throw(errorMessage);

  }  // END handleError

}
