import { TestBed, inject } from '@angular/core/testing';

import { UsuService } from './usu.service';

describe('UsuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsuService]
    });
  });

  it('should be created', inject([UsuService], (service: UsuService) => {
    expect(service).toBeTruthy();
  }));
});
