import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(
    private readonly _http: HttpClient,
    private readonly _route: Router,
    private readonly _fb: FormBuilder,
    private readonly _authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.signupForm = this._fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  signup() {
    const { email, password } = this.signupForm.value;

    if (email && password) {
      this._authService.signup({ email, password })
        .subscribe(
          () => {
            this._route.navigateByUrl('/login');
          }
        );
    }
  }
}
