import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../interfaces/user.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API = 'http://localhost:3000/api/signup';

  constructor(
    private readonly _http: HttpClient,
  ) {}

  login(user: User) {
    this._http.get<User>(this.API, user)
      // .subscribe(res=> {
      //   const user = res.find((a:any)=>{
      //     return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
      //   });
      //   if(user){
      //     alert('Login Succesful');
      //     this.loginForm.reset()
      //     this.router.navigate(["home"])
      //   }else{
      //     alert("user not found")
      //   }
      // },err=>{
      //   alert("Something went wrong")
      // })
  }
}
