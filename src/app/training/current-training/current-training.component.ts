import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer: number;
  isActive = true;
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.onKeep();
  }

  onStop() {
    clearInterval(this.timer);
    this.dialog.open()
  }

  onKeep() {
    this.timer = setInterval(() => {
      this.progress = this.progress + 5;
      if (this.progress >= 100) {
        clearInterval(this.timer);
        this.isActive = false;
      }
    }, 1000);
  }

  clickTimer() {
    this.isActive = !this.isActive;
    console.log(this.isActive, 'check');
    this.isActive ? this.onKeep() : this.onStop();
  }

}
