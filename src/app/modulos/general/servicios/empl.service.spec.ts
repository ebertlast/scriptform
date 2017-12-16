import { TestBed, inject } from '@angular/core/testing';

import { EmplService } from './empl.service';

describe('EmplService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmplService]
    });
  });

  it('should be created', inject([EmplService], (service: EmplService) => {
    expect(service).toBeTruthy();
  }));
});
