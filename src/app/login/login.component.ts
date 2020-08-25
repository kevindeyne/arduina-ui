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

  private username = 'kevindeyne@gmail.com';
  private password = 'passw0rd';
  private error = null;

  constructor(private userService: UserService, private httpClient: HttpClient, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.spinner.hide();
  }

  login() {
    this.spinner.show();
    const auth = { username: this.username, password: this.password };
    this.httpClient
      .post<any>('http://localhost:80/authenticate', auth)
      .pipe(catchError((e: any) => this.handleError(e, this)))
      .subscribe(userData => { this.userService.login(userData.token); });
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
