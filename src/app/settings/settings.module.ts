import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared/shared.module';
import { FullPageModule } from '@app/layout/full-page/full-page.module';
import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings-routing.module';

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    SharedModule,
    SettingsRoutingModule,
    FullPageModule,
  ]
})
export class SettingsModule {}
