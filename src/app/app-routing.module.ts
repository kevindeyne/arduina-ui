import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectsComponent } from './projects/projects.component';
import { TeamComponent } from './team/team.component';
import { TestcasesComponent } from './testcases/testcases.component';

const routes : Routes = [
  { path: '', component: TeamComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'projects/:id', component: ProjectsComponent },
  { path: 'testcases', component: TestcasesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
