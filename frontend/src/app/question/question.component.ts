import { Component } from '@angular/core';
import { timestamp } from 'rxjs';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponent {
  question: string = 'What will you choose from the below?';
  timeLeft: number = 60;
  interval: any;
  timerStarted: boolean = false;
  selectedOption: number = -1;
  crctOption: any;
  correctAnswerFlag: boolean = false;
  wrongAnswerFlag: boolean = false;
  startFlag: boolean = false;
  pauseFlag: boolean = false;

  options: any = [
    { id: 0, name: 'sample1', crct: true, color: false },

    { id: 1, name: 'option2', crct: false, color: false },

    { id: 2, name: 'osample33', crct: false, color: false },

    { id: 3, name: 'option4', crct: false, color: false },
  ];
  print(data: any) {
    console.log(data.name);
  }

  startTimer() {
    this.startFlag = true;
    this.pauseFlag = false;
    if (!this.timerStarted) {
      this.interval = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          // alert('entiki poooo');
          this.timeLeft = 60;
        }
      }, 1000);
      this.timerStarted = true;
    }
  }

  pauseTimer() {
    this.startFlag = false;
    this.pauseFlag = true;
    this.timerStarted = false;
    clearInterval(this.interval);
  }

  changeColor(id: number) {
    this.options.forEach((element: any) => {
      element.color = false;
      if (element.crct == true) {
        this.crctOption = element.id;
      }
    });

    this.options[id].color = !this.options[id].color;

    this.selectedOption = id;
    console.log(this.crctOption);
  }

  displayAnswer() {
    if (this.selectedOption == this.crctOption) {
      this.correctAnswerFlag = true;
    } else {
      this.correctAnswerFlag = false;
      this.wrongAnswerFlag = true;
    }
  }
}
