import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ProjectsComponent } from './projects/projects.component';
import { TeamComponent } from './team/team.component';
import { TestcasesComponent } from './testcases/testcases.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    TeamComponent,
    TestcasesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
