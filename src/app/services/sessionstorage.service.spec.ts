import { TestBed } from '@angular/core/testing';

import { SessionstorageService } from './sessionstorage.service';

describe('SessionstorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SessionstorageService = TestBed.get(SessionstorageService);
    expect(service).toBeTruthy();
  });
});
