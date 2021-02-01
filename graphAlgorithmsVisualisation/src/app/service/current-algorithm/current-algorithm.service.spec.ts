import { TestBed } from '@angular/core/testing';

import { CurrentAlgorithmService } from './current-algorithm.service';

describe('CurrentAlgorithmService', () => {
  let service: CurrentAlgorithmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentAlgorithmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
