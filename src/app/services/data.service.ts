import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Child, FlattenedProjects, Project, ProjectRootObject} from "../interfaces/core";
import {map, Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  protected dataUrl = 'assets/data.json';

  constructor(private http: HttpClient) { }

  getProjects(): Observable<FlattenedProjects> {
    return this.http.get<ProjectRootObject>(this.dataUrl)
      .pipe(
       map((res: any) => DataService.flattenData(res))
      );
  }

  static flattenData(data: ProjectRootObject): FlattenedProjects {
    const temp = {
      nodes: data.projects
        .map(project => {
          const {tasks, ...item} = project;
          return {
            ...item,
            children: tasks
          };
        })
    };

    console.log(temp);
    return temp;
  }
}
