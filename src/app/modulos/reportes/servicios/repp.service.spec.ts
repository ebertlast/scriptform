import { TestBed, inject } from '@angular/core/testing';

import { ReppService } from './repp.service';

describe('ReppService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReppService]
    });
  });

  it('should be created', inject([ReppService], (service: ReppService) => {
    expect(service).toBeTruthy();
  }));
});
