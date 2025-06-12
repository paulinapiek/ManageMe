import React, { createContext, useContext, useState, useEffect } from "react";
import { Story } from "./Story";
import { Task } from "./Task";
import { db, getDocument } from "./firebaseWrapper";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where} from "firebase/firestore";

// Tworzymy kontekst StoryManager
const StoryContext = createContext<{
  stories: Story[];
  tasks: Task[];
  fetchStories: () => Promise<void>;
  fetchTasks: () => Promise<void>;
  addStory: (story: Story) => Promise<void>;
  addTask: (task: Task) => Promise<void>;
  updateStory: (story: Story) => Promise<void>;
  updateTask: (task: Task, state: "to do" | "doing" | "done") => Promise<void>;
  deleteStory: (storyId: string) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
} | null>(null);

export const StoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stories, setStories] = useState<Story[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  // Pobieranie wszystkich historyjek z Firestore
  const fetchStories = async () => {
    const querySnapshot = await getDocs(collection(db, "stories"));
    setStories(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Story)));
  };

  // Pobieranie wszystkich zadań z Firestore
  const fetchTasks = async () => {
    const querySnapshot = await getDocs(collection(db, "tasks"));
    setTasks(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Task)));
  };

  // Dodawanie nowej historyjki do Firestore
  const addStory = async (newStory: Story) => {
    const docRef = await addDoc(collection(db, "stories"), newStory);
    const { id, ...storyData } = newStory;
    setStories(prev => [...prev, { id: docRef.id, ...storyData }]);
  };

  // Dodawanie nowego zadania do Firestore
  const addTask = async (newTask: Task) => {
    const docRef = await addDoc(collection(db, "tasks"), newTask);
    const { id, ...taskData } = newTask;
    setTasks(prev => [...prev, { id: docRef.id, ...taskData }]);
  };

  // Aktualizacja historyjki w Firestore
  const updateStory = async (updatedStory: Story) => {
      const documentId = await getDocument(updatedStory.id, "stories");
    const docRef = doc(db, "stories", documentId);
    const { id, ...storyData } = updatedStory;
    await updateDoc(docRef, storyData);
    await fetchStories(); 
   // setStories(prev => prev.map(story => (story.id === updatedStory.id ? updatedStory : story)));
  };

  // Aktualizacja zadania w Firestore
  const updateTask = async (updatedTask: Task, state: "to do" | "doing" | "done") => {
    const docRef = doc(db, "tasks", updatedTask.id);
    await updateDoc(docRef, { state });
    setTasks(prev => prev.map(task => (task.id === updatedTask.id ? { ...updatedTask, state } : task)));
  };

  // Usuwanie historyjki z Firestore
  const deleteStory = async (storyId: string) => {
     const documentId = await getDocument(storyId, "stories");
    const docRef = doc(db, "stories", documentId);
    await deleteDoc(docRef);
    setStories(prev => prev.filter(story => story.id !== storyId));

    // Usuwanie powiązanych zadań
    const q = query(collection(db, "tasks"), where("storyId", "==", storyId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (taskDoc) => {
      await deleteDoc(doc(db, "tasks", taskDoc.id));
    });
    setTasks(prev => prev.filter(task => task.storyId !== storyId));
  };

  // Usuwanie zadania z Firestore
  const deleteTask = async (taskId: string) => {
    const docRef = doc(db, "tasks", taskId);
    await deleteDoc(docRef);
    setTasks(prev => prev.filter(task => task.id !== taskId));
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
