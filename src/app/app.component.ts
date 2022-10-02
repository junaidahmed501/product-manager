import {Component, ViewChild} from '@angular/core';
import {ITreeOptions, TreeComponent, TreeModel, TreeNode} from "@circlon/angular-tree-component";
import {DataService} from "./services/data.service";
import {Child, FlattenedProjects, ProjectRootObject} from "./interfaces/core";
import {Observable, tap} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project-manager';
  // projectData$: Observable<FlattenedProjects>;
  data: FlattenedProjects | undefined;

  constructor(private dataService: DataService) {
    // this.projectData$ = this.dataService.getProjects().subscribe();
    this.dataService.getProjects().subscribe(res => {
      this.data = res;
    });
  }

  @ViewChild(TreeComponent)
  private tree: TreeComponent | undefined;

  handleAddNode(tree: TreeComponent) {
    // this.projectData$.pipe(tap(projects => projects.nodes.push({
    // this.data?.nodes.push({
    //     "id": Math.random(),
    //     "name": "New node",
    //     "description": "",
    //     "status": "",
    //     "children": []
    //   });
    tree.treeModel.getActiveNode().data.children.push({
      "id": Math.random(),
      "name": "New node",
      "description": "",
      "status": "",
      "children": []
    })
      // ));
    // this.projectData$
    // this.nodes.push({ name: 'another node' });
    // @ts-ignore
    this.tree.treeModel.update();
  }

  handleDelete(tree: TreeComponent) {
    // @ts-ignore
    this.data.nodes = tree.treeModel.nodes.filter(node => node.id !== tree.treeModel.focusedNodeId);
    tree?.treeModel.update();
  }

  handleChange(value: string, treeModel: TreeModel) {
    treeModel.getActiveNode().data['name'] = value;
    this.tree?.treeModel.update();
  }

  // id should be unique in order for state to be saved in localStorage
  // if idField is other 'id' then a unique id will be created by TreeComponent itself
  options: ITreeOptions = {
    idField: 'id',
  };

  filterFn(value: string, treeModel: TreeModel) {
    if(!value) {
      treeModel.clearFilter();
      return;
    }
    treeModel.filterNodes((node: TreeNode) => {
      return node.data.name.toLowerCase().includes(value.toLocaleLowerCase());
    });
  }

  get state() {
    return localStorage['treeState'] && JSON.parse(localStorage['treeState']);
  }
  set state(state) {
    localStorage['treeState'] = JSON.stringify(state);
  }
}
