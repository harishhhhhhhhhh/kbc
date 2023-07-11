import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-test-component',
  template: `
    <div class="Container" (click)="toggleLight()">
      <div class="LightContainer" [@animateLeftLight]="lightState">
        <div
          class="Light "
          [ngStyle]="{ 'background-color': lightColor }"
        ></div>
      </div>
      <div class="LightContainerRight" [@animateRightLight]="lightState">
        <div class="Light" [ngStyle]="{ 'background-color': lightColor }"></div>
      </div>
      <div
        class="LightContainerBottomLeft"
        [@animateBottomLeftLight]="lightState"
      >
        <div class="Light" [ngStyle]="{ 'background-color': lightColor }"></div>
      </div>
      <div
        class="LightContainerBottomRight"
        [@animateBottomRightLight]="lightState"
      >
        <div class="Light" [ngStyle]="{ 'background-color': lightColor }"></div>
      </div>
    </div>
    <!-- <div class="ButtonContainer">
    <!-- <div class="ButtonContainer">
      <button class="btn btn-primary"(click)="changeLightColor('rgba(255, 0, 0, 0.5)')">Change to Red</button>
      <button class="btn btn-primary" (click)="changeLightColor('rgba(0, 255, 0, 0.5)')">Change to gree</button>
    </div> -->
  `,
  styles: [
    `
      .Container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }

      .LightContainer {
        width: 400px;
        height: 35px;
        perspective: 350px;
        position: absolute;
        top: 10%;
        right: 10%;
        transform: rotateZ(-37deg);
      }

      .LightContainerRight {
        width: 400px;
        height: 35px;
        perspective: 350px;
        position: absolute;
        top: 10%;
        left: 10%;
        transform: rotateZ(-143deg);
      }

      .LightContainerBottomLeft {
        width: 350px;
        height: 35px;
        perspective: 300px;
        position: absolute;
        bottom: 10%;
        left: 10%;
        transform: rotateZ(37deg);
      }

      .LightContainerBottomRight {
        width: 350px;
        height: 35px;
        perspective: 300px;
        position: absolute;
        bottom: 10%;
        right: 10%;
        transform: rotateZ(143deg);
      }

      .Light {
        height: 100%;
        transform: rotateY(-45deg);
        transform-origin: 0 50%;
        background-image: linear-gradient(
          to right,
          white,
          rgba(255, 255, 255, 0.5) 70%,
          transparent
        );
        border-radius: 20% / 100% 0 0 100%;
        filter: blur(3px);
      }
      .ButtonContainer {
        /* display: flex; */
        /* justify-content: left;
      align-items: left; */
        position: absolute;
      }
    `,
  ],
  animations: [
    trigger('animateLeftLight', [
      state('off', style({ transform: 'rotateY(-90deg)' })),
      state('on', style({ transform: 'rotateZ(143deg)' })),
      transition('off => on', animate('100ms ease-in')),
      transition('on => off', animate('100ms ease-out')),
    ]),
    trigger('animateRightLight', [
      state('off', style({ transform: 'rotateY(-90deg)' })),
      state('on', style({ transform: 'rotateZ(37deg)' })),
      transition('off => on', animate('100ms ease-in')),
      transition('on => off', animate('100ms ease-out')),
    ]),
    trigger('animateBottomLeftLight', [
      state('off', style({ transform: 'rotateY(-90deg)' })),
      state('on', style({ transform: 'rotateZ(-37deg)' })),
      transition('off => on', animate('100ms ease-in')),
      transition('on => off', animate('100ms ease-out')),
    ]),
    trigger('animateBottomRightLight', [
      state('off', style({ transform: 'rotateY(-90deg)' })),
      state('on', style({ transform: 'rotateZ(-143deg)' })),
      transition('off => on', animate('100ms ease-in')),
      transition('on => off', animate('100ms ease-out')),
    ]),
  ],
})
export class TestComponentComponent implements OnInit {
  lightState = 'off';
  lightColor = '';

  ngOnInit() {
    // Start the animation after a delay (e.g., 2 seconds)
    setTimeout(() => {
      this.toggleLight();
    }, 1000);
  }

  toggleLight() {
    this.lightState = 'on';
  }

  changeLightColor(color: string) {
    this.lightColor = color;
  }
}
