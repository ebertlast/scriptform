import { TestBed, inject } from '@angular/core/testing';

import { IpsService } from './ips.service';

describe('IpsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IpsService]
    });
  });

  it('should be created', inject([IpsService], (service: IpsService) => {
    expect(service).toBeTruthy();
  }));
});
