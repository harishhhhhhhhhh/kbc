import { Component } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponent {
  question: string = 'Who is your manager?';
  options: any = [
    { id: 1, name: 'option1', crct: true },
    { id: 2, name: 'option2', crct: false },
    { id: 3, name: 'option3', crct: false },
    { id: 4, name: 'option4', crct: false },
  ];
  print(data: any) {
    console.log(data.name);
  }
}
