import { environment } from 'src/environments/environment';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

export class WebSocketAPI {
    webSocketEndPoint = environment.websocketUrl;
    topic = '/topic/greetings';
    token = null;
    stompClient: any;

    constructor() {

    }
    _connect(incomingToken) {
        console.log('Initialize WebSocket Connection');
        const ws = new SockJS(this.webSocketEndPoint);
        this.stompClient = Stomp.over(ws);
        const self = this;
        self.token = incomingToken;
        self.stompClient.connect({}, () => {
            console.log('connecting to ' + self.topic + '/' + self.token);
            self.stompClient.subscribe(self.topic + '/' + self.token, (sdkEvent) => {
                self.onMessageReceived(sdkEvent);
            });
        }, this.errorCallBack);
    }

    _disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
        console.log('Disconnected');
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
        console.log('Message Recieved from Server :: ' + message);
        this.handleMessage(JSON.stringify(message.body));
    }

    handleMessage(message: string) {
        console.log(message);
    }
}
