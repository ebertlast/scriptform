import { TestBed, inject } from '@angular/core/testing';

import { MunService } from './mun.service';

describe('MunService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MunService]
    });
  });

  it('should be created', inject([MunService], (service: MunService) => {
    expect(service).toBeTruthy();
  }));
});
