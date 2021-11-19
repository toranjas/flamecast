import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { ProjectPageModule } from '../layout/project-page/project-page.module';
import { PlanComponent } from './plan.component';
import { PlanRoutingModule } from './plan-routing.module';

@NgModule({
  declarations: [PlanComponent],
  imports: [
    CommonModule,
    SharedModule,
    PlanRoutingModule,
    ProjectPageModule,
  ]
})
export class PlanModule {}
