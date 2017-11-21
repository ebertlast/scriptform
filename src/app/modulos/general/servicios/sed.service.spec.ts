import { TestBed, inject } from '@angular/core/testing';

import { SedService } from './sed.service';

describe('SedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SedService]
    });
  });

  it('should be created', inject([SedService], (service: SedService) => {
    expect(service).toBeTruthy();
  }));
});
