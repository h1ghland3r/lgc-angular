import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutModule } from './../about/about.module';
import { PostModule } from '../post/post.module';
import { HomeComponent } from './home.component';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    AboutModule,
    PostModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
