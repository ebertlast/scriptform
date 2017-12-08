import { TestBed, inject } from '@angular/core/testing';

import { GdiService } from './gdi.service';

describe('GdiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GdiService]
    });
  });

  it('should be created', inject([GdiService], (service: GdiService) => {
    expect(service).toBeTruthy();
  }));
});
