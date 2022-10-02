import { Component } from '@angular/core';
import {ITreeOptions, TreeModel, TreeNode} from "@circlon/angular-tree-component";
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

  constructor(private dataService: DataService) {
    this.projectData$ = this.dataService.getProjects();
  }

  options: ITreeOptions = {
    idField: '_id',
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

  filterFn(value: string, treeModel: TreeModel) {
    if(!value) {
      treeModel.clearFilter();
      return;
    }
    treeModel.filterNodes((node: TreeNode) => {
      return node.data.name.includes(value);
    });

  }
}
