import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-display-number',
  templateUrl: './display-number.component.html',
  styleUrls: ['./display-number.component.css'],
})
export class DisplayNumberComponent implements OnInit {
  addingClassFlag: boolean = false;
  @Input('quesNumber') questionNumber: number = 1;
  ngOnInit(): void {
    // let angle = 0;
    // setInterval(() => {
    //   angle++;
    //   document.getElementById('myDiv').style.transform = `rotate(${angle}deg)`;
    // }, 10);
  }

  turnOffOrOn() {
    setTimeout(() => {
      this.addingClassFlag = true;
    }, 600);
    console.log('hey theere');
    setTimeout(() => {
      this.addingClassFlag = false;
    }, 2700);
  }
}
