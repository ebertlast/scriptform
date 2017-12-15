import { TestBed, inject } from '@angular/core/testing';

import { ZonService } from './zon.service';

describe('ZonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ZonService]
    });
  });

  it('should be created', inject([ZonService], (service: ZonService) => {
    expect(service).toBeTruthy();
  }));
});
