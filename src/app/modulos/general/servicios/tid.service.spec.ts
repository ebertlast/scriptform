import { TestBed, inject } from '@angular/core/testing';

import { TidService } from './tid.service';

describe('TidService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TidService]
    });
  });

  it('should be created', inject([TidService], (service: TidService) => {
    expect(service).toBeTruthy();
  }));
});
