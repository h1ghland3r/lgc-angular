import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post.component';
import { AppMaterialModule } from 'src/app/app.material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoadingSpinnerModule } from './../../shared/components/loading-spinner/loading-spinner.module';

@NgModule({
  declarations: [
    PostComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    FlexLayoutModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    LoadingSpinnerModule
  ],
  exports: [
    PostComponent
  ]
})
export class PostModule { }
