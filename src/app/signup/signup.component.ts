import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
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
      password: ['', Validators.required],
      userType: ['', Validators.required],
    });
  }

  isFieldInputInvalid(fieldName: string) {
    const formField: FormControl = this.signupForm.get(fieldName) as FormControl;
    return formField.invalid && (formField.dirty || formField.touched);
  }

  signup() {
    const { email, password, userType } = this.signupForm.value;

    if (email && password && userType) {
      this._authService.signup({ email, password, type: userType })
        .subscribe(
          () => {
            this._route.navigateByUrl('/login');
          }
        );
    }
  }
}
