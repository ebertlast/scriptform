import { TestBed, inject } from '@angular/core/testing';

import { GenService } from './gen.service';

describe('GenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GenService]
    });
  });

  it('should be created', inject([GenService], (service: GenService) => {
    expect(service).toBeTruthy();
  }));
});
