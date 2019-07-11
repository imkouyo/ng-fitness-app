import { Component, OnInit } from '@angular/core';
import {Form, FormGroup} from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  private  maxDate;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }
  onSubmit(f: any) {
    this.authService.registerUser({
        email: f.form.value.email,
        password: f.form.value.password
      });
  }
}
//
