import { TestBed } from '@angular/core/testing';

import { ElectronFileSystemStorageProviderService } from './electron-file-system-storage-provider.service';

describe('ElectronFileSystemStorageProviderService', () => {
  let service: ElectronFileSystemStorageProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElectronFileSystemStorageProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
