import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared/shared.module';
import { ProjectPageModule } from '@app/layout/project-page/project-page.module';
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
