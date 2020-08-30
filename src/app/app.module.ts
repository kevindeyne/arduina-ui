import { UserService } from './services/user.service';
import { DocumentationService } from './services/documentation.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ProjectsComponent } from './projects/projects.component';
import { TeamComponent } from './team/team.component';
import { TestcasesComponent } from './testcases/testcases.component';
import { EditorComponent } from './editor/editor.component';
import { EditorDocsComponent } from './editor-docs/editor-docs.component';
import { LandingComponent } from './landing/landing.component';

import { TableComponent } from './sub-components/table/table.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewProjectComponent } from './new-project/new-project.component';
import { ConnectorsComponent } from './connectors/connectors.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TestcaseslistComponent } from './testcaseslist/testcaseslist.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    TeamComponent,
    TestcasesComponent,
    EditorComponent,
    EditorDocsComponent,
    LandingComponent,
    TableComponent,
    DashboardComponent,
    NewProjectComponent,
    ConnectorsComponent,
    LoginComponent,
    RegistrationComponent,
    TestcaseslistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule
  ],
  providers: [DocumentationService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
