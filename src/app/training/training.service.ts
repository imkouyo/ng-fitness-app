import { Injectable } from '@angular/core';
import {Exercise} from './exercise.model';
import {Subject} from 'rxjs';
import { map } from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  exercisesFinishChanged = new Subject<Exercise[]>();
  availableExercises: Exercise[] = [];
  private runningExercise: Exercise;
  private exercises: Exercise[] = [];
  private finishedExercises: Exercise[] = [];
  constructor(private db: AngularFirestore) { }

  fetchAvailableExercises() {
    return  this.db
      .collection('availableExercises')
      .snapshotChanges()
      .pipe(
      map(result => {
        return  result.map(res => {
          return { id: res.payload.doc.id,
            ...res.payload.doc.data()
          };
        });
      })
    ).subscribe((exercises: Exercise[]) => {
      this.availableExercises = exercises;
      this.exercisesChanged.next([...this.availableExercises]);
      });
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
    this.exerciseChanged.next({ ...this.runningExercise});
  }

  completeExercise() {
    this.addDataToDatabase({ ...this.runningExercise,
      date: new Date(),
      state: 'complete'});
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExcercise(progress: number) {
    this.addDataToDatabase({ ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.duration * (progress / 100),
      date: new Date(),
      state: 'canceled'});
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  getRunningExercise() {
    return {...this.runningExercise };
  }

  fetchCompletedOrCancelledExercises() {
    return this.db.collection('finishedExercises').valueChanges().subscribe(
      (exercises: Exercise[]) => {
        this.finishedExercises = exercises;
        this.exercisesFinishChanged.next(this.finishedExercises);
      }
    );
  }


  addDataToDatabase(exercises: Exercise) {
    this.db.collection('finishedExercises').add(exercises).then(
    );

  }
}
