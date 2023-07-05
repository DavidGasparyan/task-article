import { Injectable } from '@angular/core';
import {User} from "../interfaces/user.interface";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  get user(): User | null {
    const userJson = localStorage.getItem('user-info');

    console.log(userJson)
    if (userJson) {
      return JSON.parse(userJson) as User;
    }

    return null;
  }
}
