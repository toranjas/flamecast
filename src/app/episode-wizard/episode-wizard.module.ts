import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

import { SharedModule } from '@app/shared/shared.module';
import { FullPageModule } from '@app/layout/full-page/full-page.module';
import { EpisodeWizardComponent } from './episode-wizard.component';
import { EpisodeWizardRoutingModule } from './episode-wizard-routing.module';

@NgModule({
  declarations: [EpisodeWizardComponent],
  imports: [
    CommonModule,
    SharedModule,
    EpisodeWizardRoutingModule,
    FullPageModule,
    InputTextModule,
    ButtonModule,
    TooltipModule,
  ],
})
export class EpisodeWizardModule {}
