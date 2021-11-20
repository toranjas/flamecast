import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ElectronService } from './core/services';
import { TranslateService } from '@ngx-translate/core';
import { APP_CONFIG } from '@env/environment';
import { ElectronService } from './core/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private electronService: ElectronService,
    private translate: TranslateService
  ) {
    // Set Default Language: English - FlameCast doesn't speak other languages yet
    this.translate.setDefaultLang('en');
    this.document.documentElement.lang = 'en';

    // Diagnostics
    console.log('APP_CONFIG', APP_CONFIG);
    if (electronService.isElectron) {
      console.log(process.env);
      console.log('Run in electron');
      console.log('Electron ipcRenderer', this.electronService.ipcRenderer);
      console.log('NodeJS childProcess', this.electronService.childProcess);
    } else {
      console.log('Run in browser');
    }
  }
}
