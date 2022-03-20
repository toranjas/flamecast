import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { SharedModule } from '@app/shared/shared.module';
import { FullPageModule } from '@app/layout/full-page/full-page.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MostRecentlyUsedComponent } from '@app/most-recently-used/components/most-recently-used.component';

@NgModule({
  declarations: [HomeComponent, MostRecentlyUsedComponent],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    FullPageModule,
    InputTextModule,
    CheckboxModule,
    ButtonModule,
  ],
})
export class HomeModule {}
