import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleTrainingComponent } from './schedule-training.component';

describe('ScheduleTrainingComponent', () => {
  let component: ScheduleTrainingComponent;
  let fixture: ComponentFixture<ScheduleTrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleTrainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
