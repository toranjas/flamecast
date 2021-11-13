import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
// import { FullPageComponent } from '../layout/full-page/full-page.component';
import { FullPageModule } from '../layout/full-page/full-page.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, SharedModule, HomeRoutingModule, FullPageModule]
})
export class HomeModule {}
