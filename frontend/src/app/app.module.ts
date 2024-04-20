import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { QuestionComponent } from './question/question.component';
import { NgxTypedJsModule } from 'ngx-typed-js';
import { DisplayNumberComponent } from './display-number/display-number.component';

import { AlertcomponentComponent } from './alertcomponent/alertcomponent.component';
import { TestComponentComponent } from './test-component/test-component.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ResultComponent } from './result/result.component';
import { CongratulationComponent } from './congratulation/congratulation.component';




@NgModule({
  declarations: [AppComponent, HomeComponent, QuestionComponent, DisplayNumberComponent, ResultComponent,AlertcomponentComponent, TestComponentComponent, CongratulationComponent],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxTypedJsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
