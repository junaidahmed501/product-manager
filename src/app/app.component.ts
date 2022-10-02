import { Component } from '@angular/core';
import {ITreeOptions} from "@circlon/angular-tree-component";
import {DataService} from "./services/data.service";
import {FlattenedProjects, ProjectRootObject} from "./interfaces/core";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project-manager';
  projectData$: Observable<any>;
  nodes: any[] = [];

  constructor(private dataService: DataService) {
    this.projectData$ = this.dataService.getProjects();
  }

  // = [
  //   {
  //     id: 1,
  //     name: 'root1',
  //     children: [
  //       { id: 2, name: 'child1' },
  //       { id: 3, name: 'child2' }
  //     ]
  //   },
  //   {
  //     id: 4,
  //     name: 'root2',
  //     children: [
  //       { id: 5, name: 'child2.1' },
  //       {
  //         id: 6,
  //         name: 'child2.2',
  //         children: [
  //           { id: 7, name: 'subsub' }
  //         ]
  //       }
  //     ]
  //   }
  // ];
  options: ITreeOptions = {
    idField: '_id',
    // displayField: 'title',
    // childrenField: 'nodes'
  };

  sampleJson = {
    "projects": [
      {
        "id": 1,
        "name": "Project 1",
        "children": [
          {
            "id": 1,
            "name": "Task 1",
            "status": "active",
            "description": "Task 1 description",
            "children": [
              {
                "id": 3,
                "name": "Task 1.1",
                "description": "Task 1.1 description",
                "status": "in-progress"
              }
            ]
          },
          {
            "id": 2,
            "name": "Task 2",
            "description": "Task 2 description",
            "status": "completed",
            "children": []
          }
        ]
      }
    ]
  }
}
