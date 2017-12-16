import { TestBed, inject } from '@angular/core/testing';

import { TaeService } from './tae.service';

describe('TaeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaeService]
    });
  });

  it('should be created', inject([TaeService], (service: TaeService) => {
    expect(service).toBeTruthy();
  }));
});
