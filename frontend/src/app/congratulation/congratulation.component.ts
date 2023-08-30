import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';


@Component({
  selector: 'app-congratulation',
  templateUrl: './congratulation.component.html',
  styleUrls: ['./congratulation.component.css']
})
export class CongratulationComponent {
 
  constructor(private service: ApiServiceService) {
  console.log(this.playerName);
  }
  playerName:string = this.service.player;
 
}

