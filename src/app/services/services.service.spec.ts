import { TestBed } from '@angular/core/testing';

import { DocumentsService } from './services.service';

describe('DocumentsService', () => {
  let service: DocumentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
