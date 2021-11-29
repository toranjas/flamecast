import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { EpisodeWizardComponent } from './episode-wizard.component';

const routes: Routes = [
  {
    path: 'episode-wizard',
    component: EpisodeWizardComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EpisodeWizardRoutingModule {}
