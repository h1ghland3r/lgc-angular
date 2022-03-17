import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app.material.module';
import { HttpClientModule } from '@angular/common/http';
import { HomeModule } from './components/home/home.module';
import { NavigationModule } from './components/navigation/navigation.module';
import { ToastrModule } from 'ngx-toastr';

import { LoadingService } from './shared/services/loading.service';
import { BlogService } from 'src/app/shared/services/blog.service';

import { AppComponent } from './app.component';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    HttpClientModule,
    HomeModule,
    NavigationModule,
    ToastrModule.forRoot()
  ],
  providers: [
    BlogService,
    LoadingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
