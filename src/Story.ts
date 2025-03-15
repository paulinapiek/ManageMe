export interface Story {
    id: string;
    name: string;
    description: string;
    priority: "low" | "midium" | "high";
    projectId: string;
    createdAt: string;
    state: "to do" | "doing" | "done";
    ownerId: string;
  }
  