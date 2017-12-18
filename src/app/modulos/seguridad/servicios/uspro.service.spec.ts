import { TestBed, inject } from '@angular/core/testing';

import { UsproService } from './uspro.service';

describe('UsproService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsproService]
    });
  });

  it('should be created', inject([UsproService], (service: UsproService) => {
    expect(service).toBeTruthy();
  }));
});
