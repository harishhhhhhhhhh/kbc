import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertcomponentComponent } from './alertcomponent.component';

describe('AlertcomponentComponent', () => {
  let component: AlertcomponentComponent;
  let fixture: ComponentFixture<AlertcomponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlertcomponentComponent]
    });
    fixture = TestBed.createComponent(AlertcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
