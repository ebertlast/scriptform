import { TestBed, inject } from '@angular/core/testing';

import { GpoService } from './gpo.service';

describe('GpoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GpoService]
    });
  });

  it('should be created', inject([GpoService], (service: GpoService) => {
    expect(service).toBeTruthy();
  }));
});
