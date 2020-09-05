import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { throwError } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = 'kevindeyne@gmail.com';
  password = 'passw0rd';
  error = null;

  constructor(private userService: UserService, private httpClient: HttpClient, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.spinner.hide();
    if (!environment.production) {
      this.login();
    }
  }

  login() {
    this.spinner.show();
    const auth = { username: this.username, password: this.password };
    this.httpClient
      .post<any>(environment.baseUrl + '/authenticate', auth)
      .pipe(catchError((e: any) => this.handleError(e, this)))
      .subscribe(userData => { this.userService.login(userData.token, userData.teamToken); });
  }

  private handleError(error: HttpErrorResponse, context: LoginComponent) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      context.error = error.error.message;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      context.error = 'Authorization server returned an error. Please try again later.';
    }
    context.spinner.hide();
    return throwError(
      'Something bad happened; please try again later.');
  }
}
