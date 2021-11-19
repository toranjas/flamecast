import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ProjectPageComponent } from './project-page.component';

@NgModule({
  declarations: [ProjectPageComponent],
  imports: [SharedModule],
  exports: [ProjectPageComponent],
})
export class ProjectPageModule { }
