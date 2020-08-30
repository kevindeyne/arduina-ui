import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserService } from './services/user.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router, private httpClient: HttpClient) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.userService.isLoggedIn()) {
      if(state.url !== '/dashboard') { this.userService.redirectUrl = state.url; }

      return this.router.parseUrl('/login');
    } else {
      if (this.userService.isTimeForRefresh()) {
        this.httpClient.get<any>(environment.baseUrl + '/refreshToken', this.userService.getHeader()).subscribe(e => {
          this.userService.refreshToken(e.token);
        });
      }
      return true;
    }
  }
}
