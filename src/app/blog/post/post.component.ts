import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { marked } from 'marked';
import { LoginService } from 'src/app/login/login.service';

export interface Post {
  time: string,
  title: string,
  name: string
}

@Component({
  selector: 'tld-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  @Input() post: Post | undefined;
  content: Observable<string> | undefined;
  contentShown: boolean = false;
  marked: any = marked;

  constructor(private httpClient: HttpClient,
              public loginService: LoginService) { }

  fetchPost() {
    if (this.post) {
      if (this.contentShown) {
        this.contentShown = false;
      } else {
        this.content = this.httpClient.get(`/api/blog/post/${this.post.name}`, {responseType: 'text'})
        this.contentShown = true;
      }
    }
  }

  deletePost() {
    this.httpClient.delete(`/api/blog/post/${ this.post?.name }`)
      .subscribe();
  }
}
