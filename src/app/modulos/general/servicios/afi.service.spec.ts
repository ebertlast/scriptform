import { TestBed, inject } from '@angular/core/testing';

import { AfiService } from './afi.service';

describe('AfiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AfiService]
    });
  });

  it('should be created', inject([AfiService], (service: AfiService) => {
    expect(service).toBeTruthy();
  }));
});
