import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-testcaseslist',
  templateUrl: './testcaseslist.component.html',
  styleUrls: ['./testcaseslist.component.css']
})
export class TestcaseslistComponent implements OnInit {

  private projectId: string;
  testcases = [];
  hasLogin = false;
  projectName: string;

  constructor(private route: ActivatedRoute, private httpClient: HttpClient, private userService: UserService) { }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.params.id;

    this.httpClient.get<any>(environment.baseUrl + '/projects/' + this.projectId, this.userService.getHeader()).subscribe(e => {
        this.testcases = e.testCases;
        this.projectName = e.projectName;
        this.hasLogin = e.hasLogin;
    });
  }

}
