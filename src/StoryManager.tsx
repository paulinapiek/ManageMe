import React, { createContext, useContext, useState, useEffect } from "react";
//import axios from "axios";
import { Story } from "./Story";

// Define API URL (update with your actual endpoint)
//const API_URL = "https://api.example.com/stories";

// Create a context for StoryManager
const StoryContext = createContext<{
  stories: Story[];
  fetchStories: () => Promise<void>;
  addStory: (story: Story) => Promise<void>;
  updateStory: (story: Story,  state : "to do" | "doing" | "done") => Promise<void>;
  deleteStory: (storyId: string) => Promise<void>;
} | null>(null);

export const StoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stories, setStories] = useState<Story[]>([]);
  const [key, setKey] = useState<string>("stories");

  // Fetch all stories from the API
  const fetchStories = async () => {
    const data = localStorage.getItem(key);
    
    const result = data ? JSON.parse(data) : [];
    setStories(result);
    return result;
    // try {
    //   const response = await axios.get<Story[]>(API_URL);
    //   setStories(response.data);
    // } catch (error) {
    //   console.error("Error fetching stories:", error);
    // }
  };

  // Add a new story to the API
  const addStory = async (newStory: Story) => {
    const stories = await fetchStories();
    stories.push(newStory);
    localStorage.setItem(key, JSON.stringify(stories));
    // try {
    //   await axios.post(API_URL, newStory);
    //   await fetchStories(); // Refresh stories after adding
    // } catch (error) {
    //   console.error("Error adding story:", error);
    // }
  };

  // Update a story in the API
  const updateStory = async (updatedStory: Story, state : "to do" | "doing" | "done") => {
    const stories = (await fetchStories()).map((story:  Story) => {
     if ( story.id === updatedStory.id )      
    { 
      if (state === "doing" && !updatedStory.startDate) {
           updatedStory.state = "doing"
        updatedStory.startDate = new Date().toISOString();
          }
          
          if (state === "done" && !updatedStory.completedDate) {
             updatedStory.state = "done"
            updatedStory.completedDate = new Date().toISOString();
          }
return updatedStory;
    }
     else {
      return story;
     }
  });
    localStorage.setItem(key, JSON.stringify(stories));
    // try {
    //         if (updatedStory.state === "doing" && !updatedStory.startDate) {
    //     updatedStory.startDate = new Date().toISOString();
    //   }
    //   if (updatedStory.state === "done" && !updatedStory.completedDate) {
    //     updatedStory.completedDate = new Date().toISOString();
    //   }
    //   await axios.put(`${API_URL}/${updatedStory.id}`, updatedStory);
    //   await fetchStories(); // Refresh stories after updating
    // } catch (error) {
    //   console.error("Error updating story:", error);
    // }
  };

  // Delete a story from the API
  const deleteStory = async (storyId: string) => {
    const stories = (await fetchStories()).filter((story: Story) => story.id !== storyId);
    localStorage.setItem(key, JSON.stringify(stories));
    // try {
    //   await axios.delete(`${API_URL}/${storyId}`);
    //   await fetchStories(); // Refresh stories after deleting
    // } catch (error) {
    //   console.error("Error deleting story:", error);
    // }
  };

  return (
    <StoryContext.Provider value={{ stories, fetchStories, addStory, updateStory, deleteStory }}>
      {children}
    </StoryContext.Provider>
  );
};

// Hook to use the StoryManager context
export const useStoryManager = () => {
  const context = useContext(StoryContext);
  if (!context) {
    throw new Error("useStoryManager must be used within a StoryProvider");
  }
  return context;
};
