import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-tetris',
  templateUrl: './tetris.component.html',
  styleUrls: ['./tetris.component.scss']
})
export class TetrisComponent implements OnInit, AfterViewInit {
  ROW = 20;
  COL = 10;
  COLUMN = 10;
  SQ = 20;
  board = [];
  VACANT = '#fff';
  @ViewChild('tetris', { static: true, read: true }) cvs: HTMLCanvasElement;

  constructor() {
    for (let r = 0; r < this.ROW; r++) {
      this.board[r] = [];
      for (let c = 0; c < this.COL; c ++) {
        this.board[r][c] = this.VACANT;
      }
    }
  }

  ngOnInit() {


  }
  ngAfterViewInit(): void {
    console.log(this.cvs);
    const ctx = this.cvs.getContext('2d');
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, this.SQ, this.SQ);
  }
}
