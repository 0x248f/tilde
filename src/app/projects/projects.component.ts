import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

export interface Project {
  name: string,
  image: string,
  description: string,
  repo: string
}

@Component({
  selector: 'tld-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  projects$: Observable<Project[]>;
  constructor(private httpClient: HttpClient) {
    this.projects$ = this.httpClient.get<Project[]>('/assets/projects.json');
  }
}
