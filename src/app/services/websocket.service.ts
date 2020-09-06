import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { webSocket } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private nodeStatusChange = false;
  private newTokenChange = false;

  constructor(private userService: UserService) { }

  init() {
    if (this.userService.isLoggedIn()) {

      if (!this.nodeStatusChange) {
        this.nodeStatusChange = true;
        webSocket(environment.websocketUrl + '/topic/node/status-change/' + this.userService.teamToken).subscribe(
          msg => console.log('node change received: ' + msg),
          err => console.log(err),
          () => { this.nodeStatusChange = false; this.init(); }
        );
      }

      if (!this.newTokenChange) {
        this.newTokenChange = true;
        webSocket(environment.websocketUrl + '/topic/newToken/' + this.userService.teamToken).subscribe(
          newToken => this.userService.refreshToken(newToken.toString()),
          err => console.log(err),
          () => { this.newTokenChange = false; this.init(); }
        );
      }

    } else {
      console.log('Not logged in - no Websocket');
    }
  }
}
