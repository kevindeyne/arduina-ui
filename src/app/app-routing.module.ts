import { LoginGuard as LoginGuard } from './login.guard';
import { ConnectorsComponent } from './connectors/connectors.component';
import { NewProjectComponent } from './new-project/new-project.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectsComponent } from './projects/projects.component';
import { TeamComponent } from './team/team.component';
import { TestcasesComponent } from './testcases/testcases.component';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [LoginGuard]  },
  { path: 'team', component: TeamComponent, canActivate: [LoginGuard] },
  { path: 'projects', component: ProjectsComponent, canActivate: [LoginGuard] },
  { path: 'projects/:id', component: NewProjectComponent, canActivate: [LoginGuard] },
  { path: 'testcases', component: TestcasesComponent, canActivate: [LoginGuard] },
  { path: 'connectors', component: ConnectorsComponent, canActivate: [LoginGuard] },
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
