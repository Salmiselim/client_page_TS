import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppelFondComponent } from './appel-fond/appel-fond.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'primeng/api';
import { AppRoutingModule } from './app-routing.module';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,BrowserModule, AppRoutingModule, SharedModule, BrowserAnimationsModule, HttpClientModule,ReactiveFormsModule,CommonModule
  ]

})
export class AppModule { }
