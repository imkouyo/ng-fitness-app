import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() toggleSideNavBar = new EventEmitter<void>();
  isAuth = false;
  authSubsciption: Subscription;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authSubsciption = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }
  toggleNav() {
    this.toggleSideNavBar.emit();
  }
  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authSubsciption.unsubscribe();
  }

}
