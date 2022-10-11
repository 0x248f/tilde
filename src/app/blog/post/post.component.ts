import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { marked } from 'marked';

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

  constructor(private httpClient: HttpClient) { }

  fetchPost() {
    if (this.post) {
      if (this.contentShown) {
        this.contentShown = false;
      } else {
        this.content = this.httpClient.get('/api/blog/post/'+this.post.name, {responseType: 'text'})
        this.contentShown = true;
      }
    }
  }
}
