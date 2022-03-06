import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [
    AboutComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule
  ],
  exports: [
    AboutComponent
  ]
})
export class AboutModule { }
