import { Component, OnInit } from '@angular/core';
import { timestamp } from 'rxjs';
import { ApiServiceService } from '../api-service.service';

interface Question {
  questionName: string;
  options: string[];
  correctAnswer : string;
}

interface Category {
  categoryName: string;
  questions: Question[];
}

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponent implements OnInit {
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

  constructor(private service: ApiServiceService) { }

  data: any;
  categories: Category[] = [];
  totalCategories : any;
  ngOnInit() {

    this.service.getQuestions().subscribe((res: any) => {
      console.log(res);
      const responseData = res;

      responseData.forEach((row: any) => {
        const categoryName = row.category;
        const questionName = row.question;
        const options = [row.option1, row.option2, row.option3, row.option4];
        const answer  = row.correct;

        let category = this.categories.find((c) => c.categoryName === categoryName);

        if (!category) {
          category = { categoryName: categoryName, questions: [] };
          this.categories.push(category);
        }

        const question: Question = { questionName: questionName, options: options,correctAnswer :answer };
        category.questions.push(question);
      });

      console.log("came", this.categories);
      this.totalCategories = this.categories.length;
    })
  }

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
currentIndex :any =  0;
currentSelectedQuestion :any ="";
currentSelectedCategory :any = " ";
currentSelectedOptions : any = " ";
currentSelectedCategoryName:any = "";

nextquestion(){
   this.currentIndex = this.currentIndex % this.totalCategories;
  this.currentSelectedCategory = this.categories[this.currentIndex];

  // // Randomly select a question from the current category
  const randomQuestionIndex = Math.floor(Math.random() * this.currentSelectedCategory.questions.length);
  this.currentSelectedQuestion =this.currentSelectedCategory.questions[randomQuestionIndex].questionName;
  this.currentSelectedOptions  =this.currentSelectedCategory.questions[randomQuestionIndex].options;
  this.currentSelectedCategoryName = this.currentSelectedCategory.categoryName;

  console.log( this.currentSelectedCategory);
	console.log(this.currentSelectedQuestion);
	console.log(this.currentSelectedOptions);
  this.currentIndex++;
}

}
