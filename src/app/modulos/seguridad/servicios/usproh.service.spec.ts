import { TestBed, inject } from '@angular/core/testing';

import { UsprohService } from './usproh.service';

describe('UsprohService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsprohService]
    });
  });

  it('should be created', inject([UsprohService], (service: UsprohService) => {
    expect(service).toBeTruthy();
  }));
});
