import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared/shared.module';
import { ProjectPageModule } from '@app/layout/project-page/project-page.module';
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
