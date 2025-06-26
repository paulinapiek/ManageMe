
export class ProjectManager2 {
  private activeProjectId: string | null = null;

  setActiveProject(projectId: string): void {
    this.activeProjectId = projectId;
    localStorage.setItem("activeProject", projectId);
  }

  getActiveProject(): string | null {
    return this.activeProjectId || localStorage.getItem("activeProject");
  }
}
