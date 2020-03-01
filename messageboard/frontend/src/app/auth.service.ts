import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  BASE_URL = "http://localhost:3000/auth";
  NAME_KEY = "name";
  TOKEN_KEY = "token";

  constructor(private http: HttpClient, private router: Router) {}

  get name() {
    return localStorage.getItem(this.NAME_KEY);
  }

  get isAuthenticated() {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  get tokenHeader() {
    var header = new Headers({
      Authorization: "Bearer " + localStorage.getItem(this.TOKEN_KEY)
    });
    return new RequestOptions();
  }

  login(loginData) {
    this.http
      .post(this.BASE_URL + "/login", loginData)
      .pipe(
        tap(res => {
          this.authenticate(res);
        })
      )
      .subscribe(res => {});
  }

  register(user) {
    delete user.confirmPassword;
    this.http
      .post(this.BASE_URL + "/register", user)
      .pipe(
        tap(res => {
          this.authenticate(res);
        })
      )
      .subscribe();
  }

  logout() {
    localStorage.removeItem(this.NAME_KEY);
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(["/"]);
  }

  authenticate(res) {
    if (!res["token"]) return;

    localStorage.setItem(this.TOKEN_KEY, res["token"]);
    localStorage.setItem(this.NAME_KEY, res["firstName"]);
    this.router.navigate(["/"]);
  }
}
