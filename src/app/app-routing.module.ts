import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';

import { HomeRoutingModule } from './home/home-routing.module';
import { InformationRoutingModule } from './information/information-routing.module';
import { PlanRoutingModule } from './plan/plan-routing.module';
import { RecordRoutingModule } from './record/record-routing.module';
import { MixRoutingModule } from './mix/mix-routing.module';
import { PublishRoutingModule } from './publish/publish-routing.module';
import { SettingsModule } from './settings/settings.module';
import { EpisodeWizardRoutingModule } from './episode-wizard/episode-wizard-routing.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    HomeRoutingModule,
    InformationRoutingModule,
    PlanRoutingModule,
    RecordRoutingModule,
    MixRoutingModule,
    PublishRoutingModule,
    EpisodeWizardRoutingModule,
    SettingsModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
