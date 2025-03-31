import React, { createContext, useContext, useState, useEffect } from "react";
import { Story } from "./Story";
import { Task } from "./Task";

// Define the context for StoryManager
const StoryContext = createContext<{
  stories: Story[];
  tasks: Task[];
  fetchStories: () => void;
  fetchTasks: () => void;
  addStory: (story: Story) => void;
  addTask: (task: Task) => void;
  updateStory: (story: Story) => void;
  updateTask: (task: Task, state: "to do" | "doing" | "done") => void;
  deleteStory: (storyId: string) => void;
  deleteTask: (taskId: string) => void;
} | null>(null);

export const StoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stories, setStories] = useState<Story[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const storyKey = "stories";
  const taskKey = "tasks";

  // Fetch all stories from storage
  const fetchStories = () => {
    const data = localStorage.getItem(storyKey);
    const result = data ? JSON.parse(data) : [];
    setStories(result);
    return result;
  };

  // Fetch all tasks from storage
  const fetchTasks = () => {
    const data = localStorage.getItem(taskKey);
    const result = data ? JSON.parse(data) : [];
    setTasks(result);
    return result;
  };

  // Add a new story
  const addStory = (newStory: Story) => {
    const stories = fetchStories();
    stories.push(newStory);
    localStorage.setItem(storyKey, JSON.stringify(stories));
    setStories(stories);
  };

  // Add a new task
  const addTask = (newTask: Task) => {
    const tasks = fetchTasks();
    tasks.push(newTask);
    localStorage.setItem(taskKey, JSON.stringify(tasks));
  };

  // Update a story
  const updateStory = (updatedStory: Story) => {
    const stories = (fetchStories()).map((story: { id: string; }) => {
       if (story.id === updatedStory.id) {
      //   if (state === "doing" && !updatedStory.startDate) {
      //     updatedStory.state = "doing";
      //     updatedStory.startDate = new Date().toISOString();
      //   }
      //   if (state === "done" && !updatedStory.completedDate) {
      //     updatedStory.state = "done";
      //     updatedStory.completedDate = new Date().toISOString();
      //   }
         return updatedStory;
      }
      return story;
    });
    localStorage.setItem(storyKey, JSON.stringify(stories));
    setStories(stories);

  };

  // Update a task
  const updateTask = (updatedTask: Task, state: "to do" | "doing" | "done") => {
    const tasks = (fetchTasks()).map((task: { id: string; }) => {
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
      return task;
    });
    localStorage.setItem(taskKey, JSON.stringify(tasks));
  };

  // Delete a story and its associated tasks
  const deleteStory =  (storyId: string) => {
    const stories = (fetchStories()).filter((story: { id: string; }) => story.id !== storyId);
    localStorage.setItem(storyKey, JSON.stringify(stories));

    const tasks = (fetchTasks()).filter((task: { storyId: string; }) => task.storyId !== storyId);
    localStorage.setItem(taskKey, JSON.stringify(tasks));
    setStories(stories);
  };

  // Delete a task
  const deleteTask = (taskId: string) => {
    const tasks = fetchTasks().filter((task: { id: string; }) => task.id !== taskId);
    localStorage.setItem(taskKey, JSON.stringify(tasks));
  };

  return (
    <StoryContext.Provider value={{
      stories,
      tasks,
      fetchStories,
      fetchTasks,
      addStory,
      addTask,
      updateStory,
      updateTask,
      deleteStory,
      deleteTask,
    }}>
      {children}
    </StoryContext.Provider>
  );
};

export const useStoryManager = () => {
  const context = useContext(StoryContext);
  if (!context) {
    throw new Error("useStoryManager must be used within a StoryProvider");
  }
  return context;
};
