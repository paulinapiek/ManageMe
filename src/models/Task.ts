export interface Task {
    id: string;
    name: string;
    description: string;
    priority: "low" | "midium" | "high";
    storyId: string; // Powiązanie z historyjką
    estimatedTime: string; // Przewidywany czas wykonania
    state: "to do" | "doing" | "done";
    createdAt: string; // Data utworzenia
    startDate?: string;
    completedDate?: string;
    assignedUserId?: string;
  }
  