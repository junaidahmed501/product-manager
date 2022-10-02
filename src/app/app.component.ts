import {Component, ViewChild} from '@angular/core';
import {ITreeOptions, TreeComponent, TreeModel, TreeNode} from "@circlon/angular-tree-component";
import {DataService} from "./services/data.service";
import {FlattenedProjects} from "./interfaces/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Project Manager';
  data: FlattenedProjects | undefined;

  constructor(private dataService: DataService) {
    this.tree?.treeModel.clearFilter();
    this.dataService.getProjects().subscribe(res => {
      this.data = res;
    });
  }

  @ViewChild(TreeComponent)
  private tree: TreeComponent | undefined;

  handleAdd(tree: TreeComponent) {
    const item = {
      "id": Math.random(),
      "name": "New node",
      "description": "",
      "status": "",
      "children": []
    };

    if(tree.treeModel.getActiveNode()) {
      if(!tree.treeModel.getActiveNode()?.data?.children) {
        tree.treeModel.getActiveNode()['data']['children'] = [];
      }
      tree.treeModel.getActiveNode()?.data?.children.push(item)
    } else {
    this.data?.nodes.push(item)
    }
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

  handleFilter(value: string, treeModel: TreeModel) {
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
