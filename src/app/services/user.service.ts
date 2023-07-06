import { Injectable } from '@angular/core';
import {User} from "../interfaces/user.interface";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  get user(): User | null {
    const userJson = localStorage.getItem('user-info');

    if (userJson) {
      return JSON.parse(userJson) as User;
    }

    return null;
  }

  isAdmin(): boolean {
    if (this.user?.type) {
      return this.user.type === 'admin';
    }

    return false;
  }
}
