import { Component } from '@angular/core';
import { LoginService } from './login/login.service';

@Component({
  selector: 'tld-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tilde';
  constructor(public loginService: LoginService) {}
}
