// import { Component } from '@angular/core';
// import { ApiServiceService } from '../api-service.service';
// @Component({
//   selector: 'app-result',
//   templateUrl: './result.component.html',
//   styleUrls: ['./result.component.css']
// })
// export class ResultComponent {
//   selectedFile!:File
//   constructor(
//     private service:ApiServiceService,
//   ){

//   }
//   onFileSelected(event: any): void {
//     this.selectedFile = event.target.files[0];
//   }
//   onUpload(): void {
//     if (this.selectedFile) {
//       const uploadData = new FormData();
//       uploadData.append('file', this.selectedFile, this.selectedFile.name);

//       this.service.sendFile(uploadData)
//         .subscribe(
//           (response) => {
//             console.log('Upload successful');
//           },
//           (error) => {
//             console.error('Upload error:', error);
//           }
//         );
//     }
//   }
// }
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  @ViewChild('clockCanvas', {static: true}) canvasRef!: ElementRef<HTMLCanvasElement>;
  context!: CanvasRenderingContext2D;
  secondsColor = 'hsla(180, 85%, 5%, .7)';
  minutesColor = 'hsla(180, 95%, 15%, 1)';
  hoursColor = 'hsla(180, 75%, 25%, 1)';
  currentHr!: number;
  currentMin!: number;
  currentSec!: number;
  currentMillisec!: number;
  ang = 0;
  t: any;

  constructor() { }

  ngOnInit(): void {
    this.context = this.canvasRef.nativeElement.getContext('2d')!;
    if (this.context) {
      this.t = setInterval(() => this.updateTime(), 50);
      this.resizeCanvas();
      window.addEventListener('resize', () => this.resizeCanvas());
    } else {
      console.error('CanvasRenderingContext2D not supported');
    }
  }

  updateTime() {
    const currentDate = new Date();
    const g = this.context.createRadialGradient(250, 250, 0.5, 250, 250, 250);
    g.addColorStop(0, 'hsla(180, 55%, 8%, 1)');
    g.addColorStop(1, 'hsla(180, 95%, 15%, 1)');
    this.context.fillStyle = g;
    this.context.fillRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
    this.currentSec = currentDate.getSeconds();
    this.currentMillisec = currentDate.getMilliseconds();
    this.currentMin = currentDate.getMinutes();
    this.currentHr = currentDate.getHours();
    if (this.currentHr === 0) {
      this.currentHr = 12;
    } else if (this.currentHr >= 13) {
      this.currentHr -= 12;
    }
    this.drawSeconds();
    this.drawMinutes();
    this.drawHours();
    const realTime = this.currentHr + ':' + this.numPad0(this.currentMin) + ':' + this.numPad0(this.currentSec);
    const textPosX = 250 - (this.context.measureText(realTime).width / 2);
    this.context.shadowColor = 'hsla(180, 100%, 5%, 1)';
    this.context.shadowBlur = 100;
    this.context.shadowOffsetX = 12;
    this.context.shadowOffsetY = 0;
    this.context.fillStyle = 'hsla(255,255%,255%,.7)';
    this.context.font = "bold 1.6em 'Noto Serif', serif";
    this.context.fillText(realTime, textPosX, this.canvasRef.nativeElement.height / 2 + 50);
  }

  drawSeconds() {
    this.ang = 0.006 * ((this.currentSec * 1000) + this.currentMillisec);
    this.context.fillStyle = this.secondsColor;
    this.context.beginPath();
    this.context.moveTo(250, 250);
    this.context.lineTo(250, 50);
    this.context.arc(250, 250, 200, this.calcDeg(0), this.calcDeg(this.ang), false);
    this.context.lineTo(250, 250);
    this.context.shadowColor = 'hsla(180, 45%, 5%, .4)';
    this.context.shadowBlur = 15;
    this.context.shadowOffsetX = 15;
    this.context.shadowOffsetY = 15;
    this.context.fill();
  }

  drawMinutes() {
    this.ang = 0.0001 * ((this.currentMin * 60 * 1000) + (this.currentSec * 1000) + this.currentMillisec);
    this.context.fillStyle = this.minutesColor;
    this.context.beginPath();
    this.context.moveTo(250, 250);
    this.context.lineTo(250, 100);
    this.context.arc(250, 250, 150, this.calcDeg(0), this.calcDeg(this.ang), false);
    this.context.lineTo(250, 250);
    this.context.shadowColor = 'hsla(180, 25%, 5%, .4)';
    this.context.shadowBlur = 15;
    this.context.shadowOffsetX = 15;
    this.context.shadowOffsetY = 15;
    this.context.fill();
  }

  drawHours() {
    this.ang = 0.000008333 * ((this.currentHr * 60 * 60 * 1000) + (this.currentMin * 60 * 1000) + (this.currentSec * 1000)+ this.currentMillisec);
    this.context.fillStyle = this.hoursColor;
    this.context.beginPath();
    this.context.moveTo(250, 250);
    this.context.lineTo(250, 150);
    this.context.arc(250, 250, 100, this.calcDeg(0), this.calcDeg(this.ang), false);
    this.context.lineTo(250, 250);
    this.context.shadowColor = 'hsla(180, 15%, 5%, .4)';
    this.context.shadowBlur = 15;
    this.context.shadowOffsetX = 15;
    this.context.shadowOffsetY = 15;
    this.context.fill();
  }

  resizeCanvas() {
    this.canvasRef.nativeElement.width = 500;
    this.canvasRef.nativeElement.height = 500;
    this.context.translate(250, 250);
  }

  calcDeg(deg: number) {
    return (Math.PI/180) * (deg - 90);
  }

  numPad0(num: number) {
    return num.toString().padStart(2, '0');
  }

  ngOnDestroy() {
    clearInterval(this.t);
  }
}