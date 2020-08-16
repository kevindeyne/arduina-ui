import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projectId = 0;

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.params['id'];
  }

}
