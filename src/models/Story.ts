export interface Story {
  id: string;
  name: string;
  description: string;
  priority: "low" | "medium" | "high";
  projectId: string;
  createdAt: string;
  state: "to do" | "doing" | "done";
  ownerId: string;
  startDate?: string;
  completedDate?: string;
  assignedUserId?: string;
 
}
