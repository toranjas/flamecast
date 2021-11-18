import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared/shared.module';
import { ProjectPageModule } from '@app/layout/project-page/project-page.module';
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
