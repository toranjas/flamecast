import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { ProjectPageModule } from '../layout/project-page/project-page.module';
import { PublishRoutingModule } from './publish-routing.module';
import { PublishComponent } from './publish.component';

@NgModule({
  declarations: [PublishComponent],
  imports: [
    CommonModule,
    SharedModule,
    PublishRoutingModule,
    ProjectPageModule,
  ]
})
export class PublishModule {}
