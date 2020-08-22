import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public isLanding: Boolean;

  constructor(private router: Router) {}

  ngOnInit() {
      this.router.events
          .subscribe( ( event ) => {
              if ( event instanceof NavigationEnd ) {
                  this.isLanding = event.url === '/'
              }
          });
  }

}
