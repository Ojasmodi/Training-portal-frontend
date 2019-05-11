import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrainingManagementService {


  private url = 'http://localhost:3000/api/v1';

  constructor(public _http: HttpClient) { }

  public addClassroom(data): any {
    return this._http.post(`${this.url}/training/classroom/add`, data);
  }

  public addTrainer(data): any {
    return this._http.post(`${this.url}/training/trainer/add`, data);
  }

  public getAllClassrooms(): any {
    return this._http.get(`${this.url}/training/classrooms/all`);
  }

  public getAllTrainers(): any {
    return this._http.get(`${this.url}/training/trainer/all`);
  }

  public addSchedule(data): any {
    return this._http.post(`${this.url}/training/schedule/add`, data);
  }

  public deleteSchedule(data): any {
    return this._http.post(`${this.url}/training/schedule/delete`, data);
  }

  public deleteTrainer(id): any {
    let data = {};
    return this._http.post(`${this.url}/training/trainer/delete/${id}`, data);
  }

  public getAllSchedules(): any {
    return this._http.get(`${this.url}/training/schedule/all`);
  }

}
