import { Component } from '@angular/core';
import { timestamp } from 'rxjs';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponent {
  timeLeft: number = 60;
  interval: any;
  timerStarted: boolean = false;
  selectedOption: number = -1;
  crctOption: any;
  correctAnswerFlag: boolean = false;
  wrongAnswerFlag: boolean = false;

  questions: any = [
    {
      id: 0,
      question: 'this is question 1',
      opt1: 'sample1',
      opt2: 'sample2',
      opt3: 'sample3',
      opt4: 'sample4',
      crct: 'sample3',
      color: false,
    },
    {
      id: 1,
      question: 'this is question 2',
      opt1: 'sample1',
      opt2: 'sample2',
      opt3: 'sample3',
      opt4: 'sample4',
      crct: 'sample2',
      color: false,
    },
    {
      id: 2,
      question: 'this is question 3',
      opt1: 'sample1',
      opt2: 'sample2',
      opt3: 'sample3',
      opt4: 'sample4',
      crct: 'sample1',
      color: false,
    },
    {
      id: 3,
      question: 'this is question 4',
      opt1: 'sample1',
      opt2: 'sample2',
      opt3: 'sample3',
      opt4: 'sample4',
      crct: 'sample4',
      color: false,
    },
  ];

  print(data: any) {
    console.log(data.name);
  }

  startTimer() {
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
    this.timerStarted = false;
    clearInterval(this.interval);
  }

  changeColor(id: number) {
    this.questions.forEach((element: any) => {
      element.color = false;
      if (element.crct == true) {
        this.crctOption = element.id;
      }
    });

    this.questions[id].color = !this.questions[id].color;

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
