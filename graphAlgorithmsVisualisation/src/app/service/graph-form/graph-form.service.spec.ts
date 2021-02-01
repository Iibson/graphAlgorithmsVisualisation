import { TestBed } from '@angular/core/testing';

import { GraphFormService } from './graph-form.service';

describe('GraphFormService', () => {
  let service: GraphFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
