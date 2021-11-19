import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { ProjectPageModule } from '../layout/project-page/project-page.module';
import { MixRoutingModule } from './mix-routing.module';
import { MixComponent } from './mix.component';

@NgModule({
  declarations: [MixComponent],
  imports: [
    CommonModule,
    SharedModule,
    MixRoutingModule,
    ProjectPageModule,
  ]
})
export class MixModule {}
