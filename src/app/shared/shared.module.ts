import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TooltipModule } from 'primeng/tooltip';

import { PageNotFoundComponent, SideNavComponent } from './components/';
import { WebviewDirective } from './directives/';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    WebviewDirective,
    SideNavComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    FormsModule,
    TooltipModule,
  ],
  exports: [
    TranslateModule,
    WebviewDirective,
    FormsModule,
    RouterModule,
    SideNavComponent
  ]
})
export class SharedModule {}
