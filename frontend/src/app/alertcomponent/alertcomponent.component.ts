import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alertcomponent',
  templateUrl: './alertcomponent.component.html',
  styleUrls: ['./alertcomponent.component.css'],
})
export class AlertcomponentComponent {
  alertBtn: boolean = false;
  @Output()
  onBtnClicked: EventEmitter<boolean> = new EventEmitter();

  @Input('image') imgSrc = '';

  btnClick() {
    this.onBtnClicked.emit(this.alertBtn);
  }
}
