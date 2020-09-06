import { EventService } from './event.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { WebSocketAPI } from './WebSocketApi';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private token: string = null;
  public teamToken: string = null;
  private expiration: number;
  private socket = null;
  private eventService: EventService;
  redirectUrl: string = null;

  constructor(private router: Router, eventService: EventService) {
    this.socket = new WebSocketAPI(eventService);
    this.eventService = eventService;
  }

  getEvents(): EventService {
    return this.eventService;
  }

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

  isTimeForRefresh() {
    return new Date().getTime() > this.expiration;
  }

  login(newToken: string, teamToken: string) {
    if (this.nullcheckToken(newToken) && this.nullcheckToken(teamToken)) {
      this.setToken(newToken);
      this.setTeamToken(teamToken);
      this.socket._connect(teamToken, this.eventService);
      if (this.redirectUrl) {
        this.router.navigate([this.redirectUrl]);
        this.redirectUrl = null;
      } else {
        this.router.navigate(['/dashboard']);
      }
    }
  }

  refreshToken(newToken: string) {
    if (this.nullcheckToken(newToken)) { this.setToken(newToken); }
  }

  private nullcheckToken(newToken: string) : boolean {
    return newToken !== null && newToken !== undefined;
  }

  private setToken(newToken: string) {
    this.token = 'Bearer ' + newToken;
    this.expiration = this.calculateExpiration();
  }

  private setTeamToken(teamToken: string) {
    this.teamToken = teamToken;
  }

  private calculateExpiration(): number {
    return new Date().getTime() + 15 * 60 * 1000;
  }

  logout() {
    this.socket._disconnect();
    this.token = null;
  }
}
