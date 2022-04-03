import { ElectronFileSystemStorageProviderService } from './electron-file-system-storage-provider.service';
import { MockStorageProviderService } from './mock-storage-provider.service';

const storageProviderFactory = () => {
  console.log('Determining storage provider from user agent.', navigator.userAgent);
  if (navigator.userAgent.toLowerCase().indexOf('electron') > -1) {
    console.log('Detected electron.');
    return new ElectronFileSystemStorageProviderService();
  } else {
    console.log('Did not detect electron.');
    return new MockStorageProviderService();
  }
};

export default storageProviderFactory;
