import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { timestamp } from 'rxjs';
import { ApiServiceService } from '../api-service.service';
import { DisplayNumberComponent } from '../display-number/display-number.component';
import { Router } from '@angular/router';

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
interface Level {
  levelNumber: number;
  categories: Category[];
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
  beat: boolean = false;
  gameLevel: number = 0;
  currentLevelsize: any;
  playerName:string =this.service.player;

  private clockaudio = new Audio();
  private correctAnsweraudio = new Audio();
  private audienceClapaudio = new Audio();
  private optionLockaudio = new Audio();
  private optionClickSuspenceaudio = new Audio();
  private wrongAnsweraudio = new Audio();
  private suspence1Audio = new Audio();
  private clockAudioSrc = '/assets/audio/kbc-clock.mp3';
  private correctAnsweraudioSrc = '/assets/audio/Kbc Correct Answer.mp3';
  private audienceClapaudioSrc = '/assets/audio/KBC  Audience Clapping.mp3';
  private optionLockaudioSrc = '/assets/audio/Lock.mp3';
  private optionClickSuspenceaudioSrc =
    '/assets/audio/Kbc suspense Amitabh Bacchan.mp3';
  private wrongAnsweraudioSrc = '/assets/audio/Kbc Galat Jawab.mp3';
  private suspence1AudioSrc = '/assets/audio/Suspense1.mp3';

  constructor(
    private service: ApiServiceService,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) {
    this.clockaudio.src = this.clockAudioSrc;
    this.correctAnsweraudio.src = this.correctAnsweraudioSrc;
    this.audienceClapaudio.src = this.audienceClapaudioSrc;
    this.optionLockaudio.src = this.optionLockaudioSrc;
    this.optionClickSuspenceaudio.src = this.optionClickSuspenceaudioSrc;
    this.optionClickSuspenceaudio.loop = true;
    this.wrongAnsweraudio.src = this.wrongAnsweraudioSrc;
    this.suspence1Audio.src = this.suspence1AudioSrc;
    this.suspence1Audio.loop = true;
  }

  data: any;
  categories: Category[] = [];
  totalCategories: any;

  levels: Level[] = [];

  ngOnInit() {
    console.log(this.service.player);
    this.service.getQuestions().subscribe((res: any) => {
      console.log(res);
      const responseData = res;

      responseData.forEach((row: any) => {
        const categoryName = row.category;
        const questionName = row?.question;
        const options = [row.option1, row.option2, row.option3, row.option4];
        const answer = row.correct;
        const questionsId = row.id;
        const questionLevel = row.level;

        let level = this.levels.find((l) => l.levelNumber === questionLevel);

        if (!level) {
          level = { levelNumber: questionLevel, categories: [] };
          this.levels.push(level);
        }

        // let category = this.categories.find(
        //   (c) => c.categoryName === categoryName
        // );

        // if (!category) {
        //   category = { categoryName: categoryName, questions: [] };
        //   this.categories.push(category);
        // }

        const question: Question = {
          id: questionsId,
          questionName: questionName,
          options: options,
          correctAnswer: answer,
        };

        if (questionLevel === level.levelNumber) {
          let category = level.categories.find(
            (c) => c.categoryName === categoryName
          );

          if (!category) {
            category = { categoryName: categoryName, questions: [] };
            level.categories.push(category);
          }

          category.questions.push(question);
          // level.categories.push(category);
        }

        // category.questions.push(question);
      });

      console.log('came', this.categories);
      console.log('levle', this.levels);
      // this.totalCategories = this.categories.length;
      this.currentLevelsize = this.levels[0].categories.length;
      this.nextquestion();
    });
  }

  setQuestionStatus(id: any, qStatus: any) {
    this.service
      .deleteQuestion(id, this.service.gameNumber, this.service.player, qStatus)
      .subscribe((res) => {
        console.log('question status updated');
      });
  }

  options: any;
  print(data: any) {
    console.log(data.name);
  }

  optionsDropDown(){
    this.displayOptions = true;
  }

  startTimer() {
   
    this.startFlag = true;
    this.pauseFlag = false;
    this.beat = true;
    this.suspence1Audio.pause();
    if (!this.timerStarted) {
      this.interval = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          
          this.timeupFlag = true;
        }
      }, 1000);
      this.timerStarted = true;
    }
    this.clockaudio.play();
  }

  pauseTimer() {
    this.beat = false;
    this.clockaudio.pause();
    this.startFlag = false;
    this.pauseFlag = true;
    this.timerStarted = false;
    clearInterval(this.interval);
  }

  changeColor(id: number) {
    if(this.startFlag || this.timeLeft === 0){
    this.suspence1Audio.pause();
    this.optionclicked = true;
    this.options.forEach((element: any) => {
      element.color = false;
      if (element.crct == true) {
        this.crctOption = element.id;
      }
    });

    this.options[id].color = !this.options[id].color;

    this.selectedOption = id;
    // this.pauseTimer();
    this.optionLockaudio.play();
    // setTimeout(() => {
    //   this.optionClickSuspenceaudio.play();
    // }, 4000);
  }
    console.log(this.crctOption);
  }

  displayAnswer() {
    this.pauseTimer();
    this.optionClickSuspenceaudio.pause();
    this.optionClickSuspenceaudio.loop = false;
    this.optionClickSuspenceaudio.currentTime = 0;
    this.optionLockaudio.pause();
    this.optionLockaudio.currentTime = 0;
    if (this.selectedOption == this.crctOption) {
      this.correctAnswerFlag = true;
      this.correctAnsweraudio.play();
      this.clapInterval = setTimeout(() => {
        this.audienceClapaudio.play();
      }, 1500);
      this.setQuestionStatus(
        this.currentSelectedQuestionId,
        this.correctAnswerFlag
      );
    } else {
      this.correctAnswerFlag = false;
      this.wrongAnswerFlag = true;
      this.setQuestionStatus(
        this.currentSelectedQuestionId,
        this.correctAnswerFlag
      );
      this.wrongAnsweraudio.play();
    }
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

  resetAudio() {
    this.clockaudio.currentTime = 0;
    this.audienceClapaudio.pause();
    this.audienceClapaudio.currentTime = 0;
  }
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
    console.log(this.correctAnswerFlag);
    setTimeout(() => {
      this.suspence1Audio.play();
    }, 2700);

    this.resetAudio();
    this.child.turnOffOrOn();
    this.currentQuestionNumber++;
    if(this.currentQuestionNumber === 12){
      this.router.navigate(['/congratulate']);
    }
    console.log("question",this.currentQuestionNumber);
    this.overlayDisplayFlag = false;
    setTimeout(() => {
      this.overlayDisplayFlag = true;
    }, 2700);

    this.currentLevelsize =  this.levels[this.gameLevel].categories.length;

    if (this.currentLevelsize == 0) {
      alert('no questions available to display');
    }
    this.currentIndex = this.currentIndex % this.currentLevelsize;
    this.currentSelectedCategory =
      this.levels[this.gameLevel].categories[this.currentIndex];
    console.log("gamelevel",this.gameLevel+1,"category",this.currentSelectedCategory);

    // // Randomly select a question from the current category
    this.resetVariables();
    clearInterval(this.interval);
    clearInterval(this.clapInterval);

    const randomQuestionIndex = Math.floor(
      Math.random() * this.currentSelectedCategory.questions.length
    );
    console.log('index', randomQuestionIndex);

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

    console.log(this.currentSelectedCategory);
    console.log('after splice', this.categories);

    console.log("questns dd",this.currentSelectedQuestionId);
    console.log('options', this.currentSelectedOptions);

    // this.categories[this.currentIndex].questions.splice(randomQuestionIndex, 1);
    this.levels[this.gameLevel].categories[this.currentIndex].questions.splice(randomQuestionIndex, 1);
    console.log("splice level",this.levels[this.gameLevel]);
    if (this.currentSelectedCategory.questions.length == 0) {
      console.log(
        'wemptyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy',
        this.currentSelectedCategory
      );
      // this.categories.splice(this.currentIndex, 1);
      this.levels[this.gameLevel].categories.splice(this.currentIndex,1);
      this.totalCategories -= 1;
    }
    this.currentIndex++;

    if (this.currentQuestionNumber === 4 || this.currentQuestionNumber === 8)
      this.gameLevel++;
  }

  endQuiz() {
    this.setQuestionStatus(this.currentSelectedQuestionId, false);
  }

  onAudienceBtnClicked(value: boolean) {
    this.audiencePollClickedFlag = value;
  }
  onTimeOutClose(value: boolean) {
    this.timeupFlag = value;
    this.pauseTimer();
  }
}
