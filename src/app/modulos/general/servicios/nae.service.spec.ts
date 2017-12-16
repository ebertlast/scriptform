import { TestBed, inject } from '@angular/core/testing';

import { NaeService } from './nae.service';

describe('NaeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NaeService]
    });
  });

  it('should be created', inject([NaeService], (service: NaeService) => {
    expect(service).toBeTruthy();
  }));
});
