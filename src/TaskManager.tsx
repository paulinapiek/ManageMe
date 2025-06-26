import { Task } from "./Task";
import { db , getDocument} from "./firebaseWrapper";
import { UserManager } from "./UserManager";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where } from "firebase/firestore";

export class TaskManager {
  private tasksCollection = collection(db, "tasks");
  userManager = new UserManager();

  // Pobierz wszystkie zadania z Firestore
  async getTasks(): Promise<Task[]> {
    const querySnapshot = await getDocs(this.tasksCollection);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Task));
  }

  // Pobierz zadania powiązane z daną historyjką
  async getTasksByStoryId(storyId: string): Promise<Task[]> {
    const q = query(this.tasksCollection, where("storyId", "==", storyId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Task));
  }

  // Dodaj nowe zadanie
  async addTask(task: Task): Promise<void> {
    await addDoc(this.tasksCollection, task);
  }

  // Zaktualizuj zadanie
  async updateTask(updatedTask: Task, state: "to do" | "doing" | "done"): Promise<void> {
    const documentId = await getDocument(updatedTask.id, "tasks");
    const docRef = doc(db, "tasks", documentId);
    const updateData: Partial<Task> = { state };

    if (state === "doing" && !updatedTask.startDate) {
      updateData.assignedUserId = this.userManager.getUser()?.id || "";
      updateData.startDate = new Date().toISOString();
    }
    if (state === "done" && !updatedTask.completedDate) {
      updateData.completedDate = new Date().toISOString();
    }

    await updateDoc(docRef, updateData);
  }

  // Usuń zadanie
  async deleteTask(taskId: string): Promise<void> {
    const documentId = await getDocument(taskId, "tasks");
    const docRef = doc(db, "tasks", documentId);
    await deleteDoc(docRef);
  }
   async editTask(task: Task) : Promise<void> {
        const documentId = await getDocument(task.id, "tasks");
      const docRef = doc(db, "tasks", documentId);
      const { id, ...taskData } = task;
      await updateDoc(docRef, taskData);
      
     
    };
  
}
