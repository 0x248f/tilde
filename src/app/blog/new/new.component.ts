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
    let httpOptions = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    }
    let data = JSON.stringify(form);
    this.httpClient.post(addr, data, httpOptions)
      .subscribe(data => console.log(data));
  }
}
