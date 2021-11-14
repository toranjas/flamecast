import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';

import { HomeRoutingModule } from './home/home-routing.module';
import { DetailRoutingModule } from './detail/detail-routing.module';
import { InformationRoutingModule } from './information/information-routing.module';
import { PlanRoutingModule } from './plan/plan-routing.module';
import { RecordRoutingModule } from './record/record-routing.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    HomeRoutingModule,
    DetailRoutingModule,
    InformationRoutingModule,
    PlanRoutingModule,
    RecordRoutingModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
