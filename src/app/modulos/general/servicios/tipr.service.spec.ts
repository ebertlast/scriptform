import { TestBed, inject } from '@angular/core/testing';

import { TiprService } from './tipr.service';

describe('TiprService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TiprService]
    });
  });

  it('should be created', inject([TiprService], (service: TiprService) => {
    expect(service).toBeTruthy();
  }));
});
