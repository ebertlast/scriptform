import { TestBed, inject } from '@angular/core/testing';

import { UsgruService } from './usgru.service';

describe('UsgruService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsgruService]
    });
  });

  it('should be created', inject([UsgruService], (service: UsgruService) => {
    expect(service).toBeTruthy();
  }));
});
