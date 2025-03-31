import { Task } from "./Task";

export class TaskManager {
  private key: string = "tasks";

  // Pobierz wszystkie zadania z localStorage
  getTasks(): Task[] {
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : [];
  }

  // Pobierz zadania powiązane z daną historyjką
  getTasksByStoryId(storyId: string): Task[] {
    return this.getTasks().filter((task) => task.storyId === storyId);
  }

  // Dodaj nowe zadanie
  addTask(task: Task): void {
    const tasks = this.getTasks();
    tasks.push(task);
    localStorage.setItem(this.key, JSON.stringify(tasks));
  }

  // Zaktualizuj zadanie
  updateTask(updatedTask: Task, state: "to do" | "doing" | "done"): void {
    const tasks = this.getTasks().map((task) =>
        {
            if (task.id === updatedTask.id) {
              if (state === "doing" && !updatedTask.startDate) {
                updatedTask.state = "doing";
                updatedTask.startDate = new Date().toISOString();
              }
              if (state === "done" && !updatedTask.completedDate) {
                updatedTask.state = "done";
                updatedTask.completedDate = new Date().toISOString();
              }
              return updatedTask;
            }
      return task
  });
    localStorage.setItem(this.key, JSON.stringify(tasks));
  }

  // Usuń zadanie
  deleteTask(taskId: string): void {
    const tasks = this.getTasks().filter((task) => task.id !== taskId);
    localStorage.setItem(this.key, JSON.stringify(tasks));
  }
}
