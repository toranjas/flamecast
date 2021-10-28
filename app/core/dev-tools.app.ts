/**
 * Developer Tools
 */
export default class DeveloperTools {
  /**
   * Install extensions for debugging
   */
  static installDevTools() {
    const { default: installExtension, REDUX_DEVTOOLS } = require('electron-devtools-installer');

    installExtension(REDUX_DEVTOOLS)
      .then((name: string) => console.log(`Added Extension:  ${name}`))
      .catch((err: string) => console.log('An error occurred: ', err));
  }
}
