import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { StopTrainingComponent } from './stop-training.component';
import { MatDialog } from '@angular/material';
import {TrainingService} from '../training.service';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {
  @Output() trainingExit = new EventEmitter();

  progress = 0;
  timer: number;
  isActive = true;
  constructor(private dialog: MatDialog, private trainingService: TrainingService) { }

  ngOnInit() {
    this.startOrResumeTimer();
  }
  startOrResumeTimer() {
    const step = this.trainingService.getRunningExercise().duration / 100;
    this.timer = setInterval(() => {
      this.progress = this.progress + 1;
      if (this.progress >= 100) {
        this.trainingService.completeExercise();
        clearInterval(this.timer);
        this.isActive = false;
      }
    }, step * 1000);
  }

  onStop() {
    const dialogRef = this.dialog.open( StopTrainingComponent, {
      data: { passData: this.progress }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.trainingService.cancelExcercise(this.progress);
        clearInterval(this.timer);
        this.trainingExit.emit();
      }
    });
  }

}
