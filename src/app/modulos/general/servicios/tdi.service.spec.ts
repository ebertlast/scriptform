import { TestBed, inject } from '@angular/core/testing';

import { TdiService } from './tdi.service';

describe('TdiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TdiService]
    });
  });

  it('should be created', inject([TdiService], (service: TdiService) => {
    expect(service).toBeTruthy();
  }));
});
