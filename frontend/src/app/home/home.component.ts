import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  name: string = '';
  tempGame : any;
  playerName : string = '';
  playerNameDisplayFlag : boolean = false;
  private audio = new Audio();
  private audioSrc = '/assets/audio/Kbc Theme.mp3';
  positionIncrement: number = 10;

  // @ViewChild('nameInput') nameInput!: ElementRef;

  constructor(private service: ApiServiceService, private router: Router) {
    this.audio.src = this.audioSrc;
    
    
  }

  ngOnInit() {
    // this.service.getQuestions().subscribe((res: any) => {
    //   console.log(res);
    // });
   
     this.service.getGameNumber().subscribe((res : any)=>{
      this.tempGame = res["number"];
      console.log(this.tempGame);
      this.service.gameNumber = Number(this.tempGame) + 1;
    });
 
  }
  dropPlayerName(){
    console.log("drop working");
    // this.nameInput.nativeElement.focus();
    this.playerNameDisplayFlag = !this.playerNameDisplayFlag;
    

  }
savePlayerName(){
  // console.log("player " + this.playerName);
  this.service.player = this.playerName;
  if(this.playerName){
  this.router.navigate(['/questions']);
  }
}

getPosition(): number {
  return -this.playerName.length * this.positionIncrement;
}

updateWidth(): void {
  requestAnimationFrame(() => {
    this.getPosition();
  });
}


  @HostListener('window:click')
  onWindowClick() {
    this.playAudio();
  }

  playAudio() {
    this.audio.play();
    this.audio.loop = true;
  }

  ngOnDestroy() {
    this.audio.pause();
    this.audio.loop = false;
  }
}
