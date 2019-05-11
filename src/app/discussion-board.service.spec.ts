import { TestBed } from '@angular/core/testing';

import { DiscussionBoardService } from './discussion-board.service';

describe('DiscussionBoardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DiscussionBoardService = TestBed.get(DiscussionBoardService);
    expect(service).toBeTruthy();
  });
});
