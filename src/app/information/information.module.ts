import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { ProjectPageModule } from '../layout/project-page/project-page.module';
import { InformationComponent } from './information.component';
import { InformationRoutingModule } from './information-routing.module';

@NgModule({
  declarations: [InformationComponent],
  imports: [
    CommonModule,
    SharedModule,
    InformationRoutingModule,
    ProjectPageModule,
  ]
})
export class InformationModule {}
