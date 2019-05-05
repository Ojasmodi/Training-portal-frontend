import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminSectionComponent } from './admin-section/admin-section.component';
import { TrainingCalenderComponent } from './training-calender/training-calender.component';
import { ScheduleTrainingComponent } from './schedule-training/schedule-training.component';
import { AddTrainerComponent } from './add-trainer/add-trainer.component';
import { AddClassroomComponent } from './add-classroom/add-classroom.component';
import { TrainersListComponent } from './trainers-list/trainers-list.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AdminSectionComponent, TrainingCalenderComponent,
    ScheduleTrainingComponent, AddTrainerComponent, AddClassroomComponent, TrainersListComponent],
  imports: [
    CommonModule, RouterModule.forChild([
      { path: 'addClassroom', component: AddClassroomComponent },
      { path: 'addTrainer', component: AddTrainerComponent },
      { path: 'trainersList', component: TrainersListComponent },
      { path: 'trainingCalender', component: TrainingCalenderComponent },
      { path: 'adminSection', component: AdminSectionComponent },
      { path: 'trainingForm', component: ScheduleTrainingComponent }
    ]),BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule
  ]
})
export class AdminModule { }
