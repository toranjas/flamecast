import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { ProjectPageModule } from '../layout/project-page/project-page.module';
import { RecordRoutingModule } from './record-routing.module';
import { RecordComponent } from './record.component';

@NgModule({
  declarations: [RecordComponent],
  imports: [
    CommonModule,
    SharedModule,
    RecordRoutingModule,
    ProjectPageModule,
  ]
})
export class RecordModule {}
