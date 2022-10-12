import { Component, Input, OnInit } from '@angular/core';
import { Project } from '../projects.component';

@Component({
  selector: 'tld-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  @Input() project: Project | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
