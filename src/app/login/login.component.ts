import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { LoginService } from './login.service';

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

  constructor(private httpClient: HttpClient,
              private loginService: LoginService) { }

  doLogin(form: LoginForm) {
    this.httpClient.post('/api/login', form, {responseType: 'text'})
      .subscribe(response => {
        console.log(response);
        if (response === 'ok')
          this.loginService.loggedIn = true;
      });
  }
}
