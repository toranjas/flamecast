import * as path from 'path';
import * as fs from 'fs';
import { BrowserWindow, screen } from 'electron';

/**
 * Options for window creation
 */
export interface WindowFactoryOptions {
  /**
   * Position of the top left corner
   */
  position: Electron.Point,
  /**
   * Size of the window
   */
  size: Electron.Size,
  /**
   * Allow insecure content (only debug mode)
   */
  allowRunningInsecureContent: boolean,
}

/**
 * Manages creation of windows
 */
export class ElectronWindowFactory {
  /**
   * Holds the instance of the main window
   */
  private window: BrowserWindow = null;


  public get angularPath() : string {
    return path.join(process.cwd(), '/resources/app');
  }


  public createWindow(options: Partial<WindowFactoryOptions>) {
    if (!options.size) {
      /** Default to primary display: Take the whole work area size (like maxmized) */
      options.size = screen.getPrimaryDisplay().workAreaSize;
    }

    this.window = new BrowserWindow({
      x: options.position?.x ?? 0,
      y: options.position?.y ?? 0,
      width: options.size.width,
      height: options.size.height,
      webPreferences: {
        nodeIntegration: true,
        allowRunningInsecureContent: options.allowRunningInsecureContent,
        contextIsolation: false,  // false if you want to run e2e test with Spectron
        enableRemoteModule: true // true if you want to run e2e test with Spectron or use remote module in renderer context (ie. Angular)
      },
    });

    if (options.allowRunningInsecureContent) {
      this.window.webContents.openDevTools();
      require('electron-reload')(__dirname, {
        electron: require(path.join(__dirname, '/../../../node_modules/electron'))
      });

      this.window.loadURL('http://localhost:4200');

    } else {

      /** TODO: Might need to review the paths here, since I moved electron ouput files to an inner folder */

      // Path when running electron executable
      let pathIndex = './index.html';

      if (fs.existsSync(path.join(this.angularPath, '/dist/index.html'))) {
        // Path when running electron in local folder
        pathIndex = '/dist/index.html';
      }

      this.window.loadURL(new URL(`file://${path.join(this.angularPath, pathIndex)}`).href);
    }

    // Emitted when the window is closed.
    this.window.on('closed', () => {
      // Dereference the window object, usually you would store window
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      this.window = null;
    });

    return this.window;
  }
}
