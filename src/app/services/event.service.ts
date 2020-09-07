import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { StatusChangeModel } from './StatusChangeModel';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor() { }

  private nodeStatusChange = new Subject<StatusChangeModel>();
  private testcaseStatusChange = new Subject<StatusChangeModel>();

  sendTestcaseStatusChange(statusChange: StatusChangeModel) {
    this.testcaseStatusChange.next(statusChange);
}

  getTestcaseStatusChanges(): Observable<StatusChangeModel> {
      return this.testcaseStatusChange.asObservable();
  }

  sendNodeStatusChange(statusChange: StatusChangeModel) {
      this.nodeStatusChange.next(statusChange);
  }

  getNodeStatusChanges(): Observable<StatusChangeModel> {
      return this.nodeStatusChange.asObservable();
  }

}
