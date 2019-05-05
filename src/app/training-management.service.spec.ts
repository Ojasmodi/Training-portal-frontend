import { TestBed } from '@angular/core/testing';

import { TrainingManagementService } from './training-management.service';

describe('TrainingManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrainingManagementService = TestBed.get(TrainingManagementService);
    expect(service).toBeTruthy();
  });
});
