import { TestBed, inject } from '@angular/core/testing';

import { TemService } from './tem.service';

describe('TemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TemService]
    });
  });

  it('should be created', inject([TemService], (service: TemService) => {
    expect(service).toBeTruthy();
  }));
});
