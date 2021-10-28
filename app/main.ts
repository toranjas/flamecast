import { app, BrowserWindow } from 'electron';
import { ElectronWindowFactory } from './core/bootstrap.app';
import DeveloperTools from './core/dev-tools.app';

// Initialize remote module
require('@electron/remote/main').initialize();

let mainWindow: BrowserWindow = null;

const args = process.argv.slice(1);
const isServing = args.some(val => val === '--serve');

/**
 * Create main window
 */
const createMainWindow = () => {
  mainWindow = new ElectronWindowFactory().createWindow({
    allowRunningInsecureContent: isServing
  });
};

try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  // Added 400 ms to fix the black background issue while using transparent window.
  // More detais at https://github.com/electron/electron/issues/15947
  app.on('ready', () => {
    setTimeout(createMainWindow, 400);

    // If running this in production build, it will throw errors because dependencies
    // are referred in devDependencies on packages.json
    if (isServing) {
      DeveloperTools.installDevTools();
    }
  });

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
      createMainWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}
