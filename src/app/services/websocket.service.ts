import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { webSocket } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private topicNodeChange = null;

  constructor(private userService: UserService) {
  }

  init() {
    if(this.userService.isLoggedIn()) {
      console.log('Team token:' + this.userService.teamToken);
      this.topicNodeChange = webSocket(environment.websocketUrl + '/topic/node/status-change');

      console.log('Websocket constructor');
      this.topicNodeChange.subscribe(
          msg => console.log('message received: ' + msg),
          // Called whenever there is a message from the server
          err => console.log(err),
          // Called if WebSocket API signals some kind of error
          () => console.log('complete')
          // Called when connection is closed (for whatever reason)
       );
    } else {
      console.log('Not logged in - no Websocket');
    }
  }
}
