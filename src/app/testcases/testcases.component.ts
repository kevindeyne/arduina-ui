import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-testcases',
  templateUrl: './testcases.component.html',
  styleUrls: ['./testcases.component.css']
})
export class TestcasesComponent implements OnInit {

  lastRunCounter = 0;
  lastRunStatus = "Not run"
  lastRun: String = this.reconstructLastRun();
  isRunning: Boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  reconstructLastRun() : String {
    if(this.lastRunCounter === 0) {
      this.lastRun = this.lastRunStatus;
    } else {
       this.lastRun = "#" + this.lastRunCounter + " - 23/08 13:34 - " + this.lastRunStatus;
    }
    return this.lastRun;
  }

  startRun() {
    this.isRunning = true;
    this.lastRunStatus = "In progress";
    this.lastRunCounter++;
    this.reconstructLastRun();

    setTimeout(()=>{
          this.isRunning = false;
          this.lastRunStatus = "Success";
          this.reconstructLastRun();
     }, 2000);
  }

  cancelRun() {
    this.isRunning = false;
    this.lastRunStatus = "Cancelled";
    this.reconstructLastRun();
  }

}
