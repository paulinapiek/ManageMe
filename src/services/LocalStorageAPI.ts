import { Project } from "../models/Project";

export class LocalStorageAPI {
    private key: string = "projects";
  
    // Pobierz listę projektów
    getProjects(): Project[] {
      const data = localStorage.getItem(this.key);
      return data ? JSON.parse(data) : [];
    }
  
    // Dodaj nowy projekt
    addProject(project: Project): void {
      const projects = this.getProjects();
      projects.push(project);
      localStorage.setItem(this.key, JSON.stringify(projects));
    }
  
    // Edytuj istniejący projekt
    updateProject(updatedProject: Project): void {
      const projects = this.getProjects();
      const updatedProjects = projects.map(project => 
        project.id === updatedProject.id ? updatedProject : project
      );
      localStorage.setItem(this.key, JSON.stringify(updatedProjects));
    }
  
    // Usuń projekt
    deleteProject(projectId: string): void {
      const projects = this.getProjects();
      const filteredProjects = projects.filter(project => project.id !== projectId);
      localStorage.setItem(this.key, JSON.stringify(filteredProjects));
    }
  }
  