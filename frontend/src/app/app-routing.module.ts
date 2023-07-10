import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { QuestionComponent } from './question/question.component';
import { DisplayNumberComponent } from './display-number/display-number.component';
import { ResultComponent } from './result/result.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'questions', component: QuestionComponent },
  { path: 'questionNumber', component: DisplayNumberComponent },
  {path: 'result', component:ResultComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule],
})
export class AppRoutingModule {}
