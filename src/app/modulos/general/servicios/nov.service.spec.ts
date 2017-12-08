import { TestBed, inject } from '@angular/core/testing';

import { NovService } from './nov.service';

describe('NovService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NovService]
    });
  });

  it('should be created', inject([NovService], (service: NovService) => {
    expect(service).toBeTruthy();
  }));
});
