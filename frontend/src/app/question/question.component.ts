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
    if (!this.timerStarted) {
      this.interval = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          // alert('entiki poooo');
          this.timeLeft = 60;
        }
      }, 250);
      this.timerStarted = true;
    }
  }

  pauseTimer() {
    this.timerStarted = false;
    clearInterval(this.interval);
  }

  optionClicked: boolean = false;
  changeColor(id: number) {
    if (!this.optionClicked) {
      this.options[id].color = !this.options[id].color;
      this.optionClicked = !this.optionClicked;
    }
  }

  dbclicked() {
    this.optionClicked = false;
  }
}
