import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { QuestionComponent } from './question/question.component';
import { DisplayNumberComponent } from './display-number/display-number.component';

import { TestComponentComponent } from './test-component/test-component.component';
import { ResultComponent } from './result/result.component';
import { CongratulationComponent } from './congratulation/congratulation.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'questions', component: QuestionComponent },
  { path: 'questionNumber', component: DisplayNumberComponent },

  {path:'test',component:TestComponentComponent},
  {path: 'result', component:ResultComponent},
  {path:'congratulate', component:CongratulationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule],
})
export class AppRoutingModule {}
