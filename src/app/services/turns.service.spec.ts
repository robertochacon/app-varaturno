import { TestBed } from '@angular/core/testing';

import { TurnsService } from './turns.service';

describe('ShipmentsService', () => {
  let service: TurnsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TurnsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
