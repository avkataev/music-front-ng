import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MainLayout } from './main-layout/main-layout';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MainLayout
  ],
  exports: [
    MainLayout,
  ]
})
export class LayoutsModule {}
