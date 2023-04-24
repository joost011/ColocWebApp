import { TestBed } from '@angular/core/testing';

import { ColocService } from './coloc.service';

describe('ColocService', () => {
  let service: ColocService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColocService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
