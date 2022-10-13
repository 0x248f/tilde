import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

interface LoginForm {
  username: string,
  password: string
}

@Component({
  selector: 'tld-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private httpClient: HttpClient) { }

  doLogin(form: LoginForm) {
    this.httpClient.post<LoginForm>('/api/login', form);
  }
}
