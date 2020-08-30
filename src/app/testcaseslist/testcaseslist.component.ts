import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-testcaseslist',
  templateUrl: './testcaseslist.component.html',
  styleUrls: ['./testcaseslist.component.css']
})
export class TestcaseslistComponent implements OnInit {

  private projectId: string;
  testcases = [];

  constructor(private route: ActivatedRoute, private httpClient: HttpClient, private userService: UserService) { }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.params.id;

    this.httpClient.get<any>('http://localhost:80/projects/' + this.projectId, this.userService.getHeader()).subscribe(e => {
      if (Array.isArray(e)) {
        this.testcases = e;
      }
    });
  }

}
