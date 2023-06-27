import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { timestamp } from 'rxjs';
import { ApiServiceService } from '../api-service.service';

interface Question {
  id: number;
  questionName: string;
  options: string[];
  correctAnswer: string;
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
  timeLeft: number = 40;
  interval: any;
  timerStarted: boolean = false;
  selectedOption: number = -1;
  crctOption: any;
  correctAnswerFlag: boolean = false;
  wrongAnswerFlag: boolean = false;
  startFlag: boolean = false;
  pauseFlag: boolean = false;
  timeupFlag: boolean = false;
  optionclicked: boolean = false;
  fiftyfiftyUsed: boolean = false;
  audiencePoleUsed: boolean = false;
  displayOptions: boolean = false;

  constructor(
    private service: ApiServiceService,
    private cdr: ChangeDetectorRef
  ) {}

  data: any;
  categories: Category[] = [];
  totalCategories: any;
  ngOnInit() {
    this.service.getQuestions().subscribe((res: any) => {
      console.log(res);
      const responseData = res;

      responseData.forEach((row: any) => {
        const categoryName = row.category;
        const questionName = row.question;
        const options = [row.option1, row.option2, row.option3, row.option4];
        const answer = row.correct;
        const questionsId = row.id;

        let category = this.categories.find(
          (c) => c.categoryName === categoryName
        );

        if (!category) {
          category = { categoryName: categoryName, questions: [] };
          this.categories.push(category);
        }

        const question: Question = {
          id: questionsId,
          questionName: questionName,
          options: options,
          correctAnswer: answer,
        };
        category.questions.push(question);
      });

      console.log('came', this.categories);
      this.totalCategories = this.categories.length;
      this.nextquestion();
    });
  }

  options: any;
  print(data: any) {
    console.log(data.name);
  }

  startTimer() {
    this.displayOptions = true;
    this.startFlag = true;
    this.pauseFlag = false;
    if (!this.timerStarted) {
      this.interval = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          // alert('entiki poooo');
          this.timeupFlag = true;
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
    this.optionclicked = true;
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

    this.pauseTimer();
  }

  //fifty fifty life line
  fiftyfifty() {
    var incorrectOptions: any = [];
    this.options.forEach((ele: any) => {
      if (!ele.crct) {
        incorrectOptions.push(ele.id);
      }
    });
    const rand1 = Math.floor(Math.random() * incorrectOptions.length);
    incorrectOptions.splice(rand1, 1);
    const rand2 = Math.floor(Math.random() * incorrectOptions.length);
    incorrectOptions.splice(rand2, 1);
    // console.log(rand1);
    // console.log(rand2);
    // console.log(incorrectOptions);
    this.options.forEach((ele: any) => {
      if (!ele.crct && ele.id !== incorrectOptions[0]) {
        ele.name = '';
      }
    });

    this.fiftyfiftyUsed = true;
  }

  //audience life line using
  audiencePole() {
    this.audiencePoleUsed = true;
  }

  currentIndex: any = 0;
  currentSelectedQuestion: any = '';
  currentSelectedCategory: any = ' ';
  currentSelectedOptions: any = ' ';
  currentSelectedCategoryName: any = '';
  currentSelectedCorrectAnswer: any = '';

  resetVariables() {
    this.timeLeft = 40;
    this.timerStarted = false;
    this.selectedOption = -1;
    this.crctOption;
    this.correctAnswerFlag = false;
    this.wrongAnswerFlag = false;
    this.startFlag = false;
    this.pauseFlag = false;
    this.timeupFlag = false;
    this.optionclicked = false;
    this.displayOptions = false;
    this.options = [
      { id: 0, name: '', crct: false, color: false, rome: 'A' },

      { id: 1, name: '', crct: false, color: false, rome: 'B' },

      { id: 2, name: '', crct: false, color: false, rome: 'C' },

      { id: 3, name: '', crct: false, color: false, rome: 'D' },
    ];
  }
  nextquestion() {
    this.currentIndex = this.currentIndex % this.totalCategories;
    this.currentSelectedCategory = this.categories[this.currentIndex];

    // // Randomly select a question from the current category
    this.resetVariables();
    clearInterval(this.interval);

    const randomQuestionIndex = Math.floor(
      Math.random() * this.currentSelectedCategory.questions.length
    );
    this.currentSelectedQuestion =
      this.currentSelectedCategory.questions[randomQuestionIndex].questionName;
    this.currentSelectedCorrectAnswer =
      this.currentSelectedCategory.questions[randomQuestionIndex].correctAnswer;
    this.currentSelectedOptions =
      this.currentSelectedCategory.questions[randomQuestionIndex].options;
    this.currentSelectedCategoryName =
      this.currentSelectedCategory.categoryName;

    this.options = [
      {
        id: 0,
        name: this.currentSelectedOptions[0],
        crct: false,
        color: false,
        rome: 'A',
      },

      {
        id: 1,
        name: this.currentSelectedOptions[1],
        crct: false,
        color: false,
        rome: 'B',
      },

      {
        id: 2,
        name: this.currentSelectedOptions[2],
        crct: false,
        color: false,
        rome: 'C',
      },

      {
        id: 3,
        name: this.currentSelectedOptions[3],
        crct: false,
        color: false,
        rome: 'D',
      },
    ];

    this.options.forEach((ele: any) => {
      if (ele.name === this.currentSelectedCorrectAnswer) {
        ele.crct = true;
      }
    });

    // console.log(this.currentSelectedCategory);
    // console.log(this.currentSelectedQuestion);
    // console.log('options', this.currentSelectedOptions);
    this.currentIndex++;
  }
}
