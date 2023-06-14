import { Component } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponent {
  question: string = 'Who is your manager?';
  timeLeft: number = 60;
  interval: any;
  
  options: any = [
    { id: 1, name: 'sample1', crct: true },
    { id: 2, name: 'option2', crct: false },
    { id: 3, name: 'osample33', crct: false },
    { id: 4, name: 'option4', crct: false },
  ];
  option1: string = this.options[0].name;
  option2: string = this.options[1].name;
  option3: string = this.options[2].name;
  option4: string = this.options[3].name;

  print(data: any) {
    console.log(data.name);
  }


startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 60;
      }
    },1000)
  }

  pauseTimer() {
    clearInterval(this.interval);
  }
}
