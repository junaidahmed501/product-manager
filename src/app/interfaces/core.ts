export interface Child {
  id: number;
  name: string;
  description: string;
  status: string;
}

export interface Task {
  id: number;
  name: string;
  status: string;
  description: string;
  children: Child[];
}

export interface Project extends Task{
  id: number;
  name: string;
  tasks: Task[] | Child[];
}

export interface ProjectRootObject {
  projects: Project[];
}

export interface FlattenedProjects {
  nodes: Task[];
}
