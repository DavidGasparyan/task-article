import { Component } from '@angular/core';
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'task-articles';

  constructor(
    private readonly _authService: AuthService,
    private readonly _router: Router,
  ) {}

  logout() {
    this._authService.logout();
    console.log('here')
    this._router.navigate(['/login'])
  }
}
