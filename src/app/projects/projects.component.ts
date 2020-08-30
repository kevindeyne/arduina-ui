import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects = [];

  constructor(private route: ActivatedRoute, private httpClient: HttpClient, private userService: UserService) { }

  ngOnInit(): void {
    //TODO instead of loading this here, get this from a service and already load it upon entry / only do update here
    this.httpClient.get<any>('http://localhost:80/projects', this.userService.getHeader()).subscribe(e => {
      if (Array.isArray(e)) {
        this.projects = e;
      }
    });
  }

}
