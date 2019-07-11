import { Component, OnInit } from '@angular/core';
import {Form, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private route: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group(
      {
        email: ['', [
          Validators.required,
          Validators.email]],
        password: ['', [
          Validators.required,
          Validators.minLength(6),
        ]],
      }

    );
  }
  onSubmit() {
    this.authService.login( {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    });
    this.route.navigate(['/']);
  }

}
