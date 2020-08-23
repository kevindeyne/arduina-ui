import { DocumentationService } from './services/documentation.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ProjectsComponent } from './projects/projects.component';
import { TeamComponent } from './team/team.component';
import { TestcasesComponent } from './testcases/testcases.component';
import { EditorComponent } from './editor/editor.component';
import { EditorDocsComponent } from './editor-docs/editor-docs.component';
import { LandingComponent } from './landing/landing.component';

import { TableComponent } from './sub-components/table/table.component';


@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    TeamComponent,
    TestcasesComponent,
    EditorComponent,
    EditorDocsComponent,
    LandingComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [DocumentationService],
  bootstrap: [AppComponent]
})
export class AppModule { }