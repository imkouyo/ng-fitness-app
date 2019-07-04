import {Component, ViewChild, ViewChildren} from '@angular/core';
import {MatSidenav} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('sidenav', {read: true, static: false} ) ele: MatSidenav;
  onToggle() {
    this.ele.toggle();
  }

}
