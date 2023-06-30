import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  name: string = '';
  private audio = new Audio();
  private audioSrc = '/assets/audio/Kbc Theme.mp3';

  constructor(private service: ApiServiceService) {
    this.audio.src = this.audioSrc;
  }

  ngOnInit() {
    this.service.getQuestions().subscribe((res: any) => {
      console.log(res);
    });
    this.audio.play();
  }
}
