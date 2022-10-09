import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, EMPTY } from 'rxjs';

interface NewPostForm {
  password: string;
  title: string;
  content: string;
}

@Component({
  selector: 'tld-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent {
  constructor(private httpClient: HttpClient) { }
  submit(form: NewPostForm) {
    console.log(form);
    let addr = "/api/blog";
    let headers = new HttpHeaders()
        .set('Content-Type', 'application/json');
    this.httpClient.post<string>(addr, JSON.stringify(form), {headers: headers})
      .subscribe(data => console.log(data));
  }
}
