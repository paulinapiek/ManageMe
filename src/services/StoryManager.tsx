import React, { createContext, useContext, useState, useEffect } from "react";
import { Story } from "../models/Story";
import { db, getDocument } from "./firebaseWrapper";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where} from "firebase/firestore";

// Tworzymy kontekst StoryManager
const StoryContext = createContext<{
  stories: Story[];
  fetchStories: () => Promise<void>;
  addStory: (story: Story) => Promise<void>;
  updateStory: (story: Story) => Promise<void>;
  deleteStory: (storyId: string) => Promise<void>;
  
 

} | null>(null);

export const StoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stories, setStories] = useState<Story[]>([]);

  // Pobieranie wszystkich historyjek z Firestore
  const fetchStories = async () => {
    const querySnapshot = await getDocs(collection(db, "stories"));
    setStories(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Story)));
  };

  

  // Dodawanie nowej historyjki do Firestore
  const addStory = async (newStory: Story) => {
    const docRef = await addDoc(collection(db, "stories"), newStory);
    const { id, ...storyData } = newStory;
    setStories(prev => [...prev, { id: docRef.id, ...storyData }]);
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
  
  };

 

  return (
    <StoryContext.Provider value={{
      stories,
      fetchStories,
      addStory,
      updateStory,
      deleteStory,
    
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
