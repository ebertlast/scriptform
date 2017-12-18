import { TestBed, inject } from '@angular/core/testing';

import { UsgruhService } from './usgruh.service';

describe('UsgruhService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsgruhService]
    });
  });

  it('should be created', inject([UsgruhService], (service: UsgruhService) => {
    expect(service).toBeTruthy();
  }));
});
