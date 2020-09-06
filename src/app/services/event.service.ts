import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { StatusChangeModel } from './StatusChangeModel';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor() { }

  private nodeStatusChange = new Subject<StatusChangeModel>();

  sendNodeStatusChange(statusChange: StatusChangeModel) {
      this.nodeStatusChange.next(statusChange);
  }

  clearNodeStatusChanges() {
      this.nodeStatusChange.next();
  }

  getNodeStatusChanges(): Observable<StatusChangeModel> {
      return this.nodeStatusChange.asObservable();
  }

}
