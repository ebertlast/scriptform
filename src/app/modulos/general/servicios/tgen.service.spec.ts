import { TestBed, inject } from '@angular/core/testing';

import { TgenService } from './tgen.service';

describe('TgenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TgenService]
    });
  });

  it('should be created', inject([TgenService], (service: TgenService) => {
    expect(service).toBeTruthy();
  }));
});
