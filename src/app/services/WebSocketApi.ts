import { environment } from 'src/environments/environment';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { EventService } from './event.service';
import { StatusChangeModel } from './StatusChangeModel';

export class WebSocketAPI {
    private webSocketEndPoint = environment.websocketUrl;

    private topicNewToken = '/topic/newToken/';
    private topicTestcaseStatusChange = '/topic/testcase-status-change/';
    private topicNodeStatusChange = '/topic/node-status-change/';

    private token = null;
    private stompClient: any;

    private eventService: EventService;

    constructor(eventService: EventService) {
        this.eventService = eventService;
    }

    _connect(teamToken) {
        const ws = new SockJS(this.webSocketEndPoint);
        this.stompClient = Stomp.over(ws);
        const self = this;
        self.token = teamToken;
        self.stompClient.connect({}, () => {
            self.stompClient.subscribe(self.topicNewToken + self.token, (e) => { self.onMessageReceived(e.body); });
            self.stompClient.subscribe(self.topicNodeStatusChange + self.token, (e) => {
                self.eventService.sendNodeStatusChange(new StatusChangeModel().copyTo(e.body));
            });
            self.stompClient.subscribe(self.topicTestcaseStatusChange + self.token, (e) => { self.onMessageReceived(e.body); });
        }, this.errorCallBack);
    }

    _disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
    }

    // on error, schedule a reconnection attempt
    errorCallBack(error) {
        console.log('errorCallBack -> ' + error);
        const self = this;
        setTimeout(() => {
            self._connect(self.token);
        }, 5000);
    }

    onMessageReceived(message) {
        this.handleMessage(message.body);
    }

    handleMessage(message: object) {
        console.log(message);
    }
}
