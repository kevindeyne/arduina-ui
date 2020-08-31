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

  nodes = [];

  private testcaseId: string;

  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.testcaseId = this.route.snapshot.params.id;
    this.httpClient.get<any>(environment.baseUrl + '/node/' + this.testcaseId, this.userService.getHeader()).subscribe(e => {
      if (Array.isArray(e)) {
        this.nodes = e;
      }
    });
  }

  reconstructLastRun(): string {
    if(this.lastRunCounter === 0) {
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

    this.httpClient.post<any>(environment.baseUrl + '/node/' + this.testcaseId + '/run', {}, this.userService.getHeader())
      .subscribe(e => {});
  }

  completeRun() { //has to be called from websocket?
    this.isRunning = false;
    this.lastRunStatus = 'Success';
    this.reconstructLastRun();
  }

  cancelRun() {
    this.isRunning = false;
    this.lastRunStatus = 'Cancelled';
    this.reconstructLastRun();
  }

}
