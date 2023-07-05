import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private readonly _http: HttpClient,
    private readonly _route: Router,
    private readonly _fb: FormBuilder,
    private readonly _authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(){
    const { email, password } = this.loginForm.value;

    console.log(email, password)

    if (email && password) {
      this._authService.login({ email, password })
        .subscribe(
          () => {
            console.log("User is logged in");
            this._route.navigateByUrl('/articles');
          }
        );
    }
  }
}
