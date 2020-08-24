import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private token: string = null;

  constructor(private router: Router) { }

  isLoggedIn() {
    return this.token != null;
  }

  login(newToken: string) {
    if (newToken !== null && newToken !== undefined) {
      this.token = 'Bearer ' + newToken;
      this.router.navigate(['/dashboard']);
    }
  }

  logout() {
    this.token = null;
  }
}
