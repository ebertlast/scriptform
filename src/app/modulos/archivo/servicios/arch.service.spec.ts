import { TestBed, inject } from '@angular/core/testing';

import { ArchService } from './arch.service';

describe('ArchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArchService]
    });
  });

  it('should be created', inject([ArchService], (service: ArchService) => {
    expect(service).toBeTruthy();
  }));
});
