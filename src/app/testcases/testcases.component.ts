import { TestNode } from './../services/TestNode';
import { UserService } from './../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-testcases',
  templateUrl: './testcases.component.html',
  styleUrls: ['./testcases.component.css']
})
export class TestcasesComponent implements OnInit {

  lastRunCounter = 0;
  lastRunStatus = 'Not run';
  lastRun: string = this.reconstructLastRun();
  isRunning = false;

  nodes: TestNode[] = [];
  projectName: string;
  testcaseName: string;

  private testcaseId: string;

  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.testcaseId = this.route.snapshot.params.id;
    this.httpClient.get<any>(environment.baseUrl + '/node/' + this.testcaseId, this.userService.getHeader()).subscribe(e => {
      this.projectName = e.projectName;
      this.testcaseName = e.testcaseName;
      if (Array.isArray(e.nodes)) {
        for (const node of e.nodes) {
          const testNode = (node as TestNode);
          testNode.command = testNode.command.trim();
          testNode.stateClass = testNode.lastState.toLowerCase();
          testNode.lastVersion = testNode.command;
        }
        this.nodes = e.nodes;
      }
    });

    this.userService.getEvents().getNodeStatusChanges().subscribe(statusChange => {
      for (const node of this.nodes) {
        if (node.id === statusChange.id) {
          node.lastState = statusChange.statusClass;
          node.lastStatePretty = statusChange.statusPrettyPrint;
          node.stateClass = statusChange.statusPrettyPrint.toLowerCase();
          node.error = statusChange.error;
          node.warning = statusChange.warning;
          break;
        }
      }
    });

    this.userService.getEvents().getTestcaseStatusChanges().subscribe(statusChange => {
        if (this.isMatch(this.testcaseId, statusChange.id)) {
          this.lastRunStatus = statusChange.statusPrettyPrint;
          this.completeRun(this.isSuccess(statusChange.statusClass));
        }
    });
  }

  isMatch(testcase: string, compareId: number): boolean {
    return parseInt(testcase, 10) === compareId;
  }

  isSuccess(status: string): boolean {
    return status === 'SUCCESS';
  }

  receiveStatusChange(e: any) {
    console.log(e);
  }

  reconstructLastRun(): string {
    if (this.lastRunCounter === 0) {
      this.lastRun = this.lastRunStatus;
    } else {
       this.lastRun = '#' + this.lastRunCounter + ' - 23/08 13:34 - ' + this.lastRunStatus;
    }
    return this.lastRun;
  }

  startRun() {
    this.isRunning = true;
    this.lastRunStatus = 'In progress';
    this.lastRunCounter++;
    this.reconstructLastRun();

    for (const node of this.nodes) {
      node.lastState = '';
      node.lastStatePretty = '';
      node.error = null;
      node.warning = null;
    }

    this.httpClient.post<any>(environment.baseUrl + '/node/' + this.testcaseId + '/run', {}, this.userService.getHeader())
      .subscribe(() => {});
  }

  completeRun(wasSuccess) {
    this.isRunning = false;
    this.reconstructLastRun();
  }

  cancelRun() {
    this.isRunning = false;
    this.lastRunStatus = 'Cancelled';
    this.reconstructLastRun();
  }

}
