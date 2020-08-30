import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private token: string = null;
  redirectUrl: string = null;

  constructor(private router: Router) { }

  getHeader() {
   const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.token
   });
   return { headers: reqHeader };
  }

  isLoggedIn() {
    return this.token != null;
  }

  login(newToken: string) {
    if (newToken !== null && newToken !== undefined) {
      this.token = 'Bearer ' + newToken;
      if (this.redirectUrl) {
        this.router.navigate([this.redirectUrl]);
        this.redirectUrl = null;
      } else {
        this.router.navigate(['/dashboard']);
      }
    }
  }

  logout() {
    this.token = null;
  }
}
