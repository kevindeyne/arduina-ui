import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { ProjectsComponent } from './projects/projects.component';
import { TeamComponent } from './team/team.component';
import { TestcasesComponent } from './testcases/testcases.component';

const appRoutes : Routes = [
  { path: '', component: TeamComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'testcases', component: TestcasesComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    TeamComponent,
    TestcasesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
