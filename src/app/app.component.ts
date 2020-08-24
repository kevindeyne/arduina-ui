import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public isLanding = true;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
      this.router.events
          .subscribe( ( event ) => {
              if ( event instanceof NavigationEnd ) {
                  this.isLanding = (event.url === '/') || (event.url === '/login') || (event.url === '/registration');
              }
          });
  }

  logout() {
      this.userService.logout();
  }

}
