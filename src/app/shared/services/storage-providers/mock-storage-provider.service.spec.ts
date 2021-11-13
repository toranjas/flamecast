import { TestBed } from '@angular/core/testing';

import { MockStorageProviderService } from './mock-storage-provider.service';

describe('MockStorageProviderService', () => {
  let service: MockStorageProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockStorageProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
