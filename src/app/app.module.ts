import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Pages
import { HomeModule } from './home/home.module';
import { InformationModule } from './information/information.module';
import { PlanModule } from './plan/plan.module';
import { RecordModule } from './record/record.module';
import { MixModule } from './mix/mix.module';
import { PublishModule } from './publish/publish.module';
import { SettingsModule } from './settings/settings.module';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { APP_CONFIG } from '../environments/environment';

// FlameCast NgRx
import { metaReducers } from './shared/store/metaReducers';
import { reducers } from './shared/store/reducers';
import { effects } from './shared/store/effects';
import storageProviderFactory from './shared/services/storage-providers/storage-provider-factory';
import { WebAudioApiMediaControlProvider } from './../_albedo/audio';

// AoT requires an exported function for factories
const httpLoaderFactory = (http: HttpClient): TranslateHttpLoader =>
  new TranslateHttpLoader(http, './assets/i18n/', '.json');

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    HomeModule,
    InformationModule,
    PlanModule,
    RecordModule,
    MixModule,
    PublishModule,
    SettingsModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: APP_CONFIG.production,
    }),
  ],
  providers: [
    { provide: 'StorageProvider', useFactory: storageProviderFactory },
    {
      provide: 'MediaControlProvider',
      useClass: WebAudioApiMediaControlProvider,
    },
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
