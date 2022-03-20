import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';

import { SharedModule } from '@app/shared/shared.module';
import { FullPageModule } from '@app/layout/full-page/full-page.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CreateEpisodeComponent } from './create-episode/create-episode.component';

@NgModule({
  declarations: [HomeComponent, CreateEpisodeComponent],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    FullPageModule,
    InputTextModule,
    CheckboxModule,
    ButtonModule,
    DividerModule,
  ],
})
export class HomeModule {}
