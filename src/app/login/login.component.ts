import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { throwError } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

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
  }

  login() {
    this.spinner.show();
    const auth = { username: this.username, password: this.password };
    this.httpClient
      .post<any>('http://localhost:80/authenticate', auth)
      .pipe(catchError(this.handleError))
      .subscribe(userData => { this.userService.login(userData.token); });
  }

  private handleError(error: HttpErrorResponse) {
    this.spinner.hide();
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      this.error = error.error.message;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
      this.error = error.error;
    }
    // Return an observable with a user-facing error message.
    this.error = 'Please try again later.';
    return throwError(
      'Something bad happened; please try again later.');
  }
}
