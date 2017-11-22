import { TestBed, inject } from '@angular/core/testing';

import { RepuService } from './repu.service';

describe('RepuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RepuService]
    });
  });

  it('should be created', inject([RepuService], (service: RepuService) => {
    expect(service).toBeTruthy();
  }));
});
