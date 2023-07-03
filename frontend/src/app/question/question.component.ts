import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { timestamp } from 'rxjs';
import { ApiServiceService } from '../api-service.service';
import { DisplayNumberComponent } from '../display-number/display-number.component';

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
  overlayDisplayFlag: boolean = false;
  currentQuestionNumber: number = 0;
  clapInterval: any;
  fiftyfityClickedFlag: boolean = false;
  audiencePollClickedFlag: boolean = false;

  private clockaudio = new Audio();
  private correctAnsweraudio = new Audio();
  private audienceClapaudio = new Audio();
  private optionLockaudio = new Audio();
  private optionClickSuspenceaudio = new Audio();
  private wrongAnsweraudio = new Audio();
  private clockAudioSrc = '/assets/audio/Kbc Clock.mp3';
  private correctAnsweraudioSrc = '/assets/audio/Kbc Correct Answer.mp3';
  private audienceClapaudioSrc = '/assets/audio/KBC  Audience Clapping.mp3';
  private optionLockaudioSrc = '/assets/audio/Kbc Option Lock Tune.mp3';
  private optionClickSuspenceaudioSrc =
    '/assets/audio/Kbc suspense Amitabh Bacchan.mp3';
  private wrongAnsweraudioSrc = '/assets/audio/Kbc Galat Jawab.mp3';

  constructor(
    private service: ApiServiceService,
    private cdr: ChangeDetectorRef
  ) {
    this.clockaudio.src = this.clockAudioSrc;
    this.correctAnsweraudio.src = this.correctAnsweraudioSrc;
    this.audienceClapaudio.src = this.audienceClapaudioSrc;
    this.optionLockaudio.src = this.optionLockaudioSrc;
    this.optionClickSuspenceaudio.src = this.optionClickSuspenceaudioSrc;
    this.optionClickSuspenceaudio.loop = true;
    this.wrongAnsweraudio.src = this.wrongAnsweraudioSrc;
  }

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

  setQuestionStatus(id: any) {
    this.service.deleteQuestion(id).subscribe((res) => {
      console.log('question status updated');
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
      }, 100);
      this.timerStarted = true;
    }
    this.clockaudio.play();
  }

  pauseTimer() {
    this.clockaudio.pause();
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
    this.pauseTimer();
    this.optionLockaudio.play();
    setTimeout(() => {
      this.optionClickSuspenceaudio.play();
    }, 4000);
    console.log(this.crctOption);
  }

  displayAnswer() {
    this.optionClickSuspenceaudio.pause();
    this.optionClickSuspenceaudio.loop = false;
    if (this.selectedOption == this.crctOption) {
      this.correctAnswerFlag = true;
      this.correctAnsweraudio.play();
      this.clapInterval = setTimeout(() => {
        this.audienceClapaudio.play();
      }, 1500);
    } else {
      this.correctAnswerFlag = false;
      this.wrongAnswerFlag = true;
      this.wrongAnsweraudio.play();
    }
    this.pauseTimer();
  }

  //fifty fifty life line
  fiftyfifty() {
    this.fiftyfityClickedFlag = true;
    setTimeout(() => {
      this.fiftyfityClickedFlag = false;
    }, 3000);
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
    this.audiencePollClickedFlag = true;
    this.pauseTimer();
  }

  currentIndex: any = 0;
  currentSelectedQuestion: any = '';
  currentSelectedCategory: any = ' ';
  currentSelectedOptions: any = ' ';
  currentSelectedCategoryName: any = '';
  currentSelectedCorrectAnswer: any = '';
  currentSelectedQuestionId: any = '';

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

  @ViewChild(DisplayNumberComponent) child!: DisplayNumberComponent;

  nextquestion() {
    this.child.turnOffOrOn();
    this.currentQuestionNumber++;
    this.overlayDisplayFlag = false;
    setTimeout(() => {
      this.overlayDisplayFlag = true;
    }, 3000);
    if (this.totalCategories == 0) {
      alert('no questions available to display');
    }

    this.currentIndex = this.currentIndex % this.totalCategories;
    this.currentSelectedCategory = this.categories[this.currentIndex];

    // // Randomly select a question from the current category
    this.resetVariables();
    clearInterval(this.interval);
    clearInterval(this.clapInterval);

    const randomQuestionIndex = Math.floor(
      Math.random() * this.currentSelectedCategory.questions.length
    );
    this.currentSelectedQuestion =
      this.currentSelectedCategory.questions[randomQuestionIndex].questionName;

    this.currentSelectedQuestionId =
      this.currentSelectedCategory.questions[randomQuestionIndex].id;
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
    console.log('after splice', this.categories);
    // console.log("questns dd",this.currentSelectedQuestionId);
    // console.log('options', this.currentSelectedOptions);
    // this.setQuestionStatus(this.currentSelectedQuestionId);
    this.categories[this.currentIndex].questions.splice(randomQuestionIndex, 1);
    if (this.currentSelectedCategory.questions.length == 0) {
      console.log(
        'wemptyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy',
        this.currentSelectedCategory
      );
      this.categories.splice(this.currentIndex, 1);
      this.totalCategories -= 1;
    }
    this.currentIndex++;
  }

  onAudienceBtnClicked(value: boolean) {
    this.audiencePollClickedFlag = value;
  }
  onTimeOutClose(value: boolean) {
    this.timeupFlag = value;
    this.pauseTimer();
  }
}
