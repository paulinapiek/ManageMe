import React, { useState, useEffect } from "react";
import { Story } from "./Story";
import { StoryManager } from "./StoryManager";

const StoryList = ({ projectId }: { projectId: string }) => {
  const [stories, setStories] = useState<Story[]>([]);
  const [filter, setFilter] = useState<"to do" | "doing" | "done" | "all">("all");

  const storyManager = new StoryManager();

  // State for new story inputs
  const [newStory, setNewStory] = useState<Partial<Story>>({
    name: "",
    description: "",
    priority: "low",
    state: "to do",
  });

  useEffect(() => {
    const allStories = storyManager.getStories();
    setStories(allStories.filter((story) => story.projectId === projectId));
  }, [projectId]);

  const filteredStories = stories.filter((story) => filter === "all" || story.state === filter);

  // Add Story Function
  const addStory = (): void => {
    const createStory: Story = {
      id: Date.now().toString(), // Auto-generate unique ID
      name: newStory.name || "Default Name",
      description: newStory.description || "Default Description",
      priority: newStory.priority as "low" | "midium" | "high",
      projectId: projectId, // Assign from props
      createdAt: new Date().toISOString(), // Auto-generate timestamp
      state: newStory.state as "to do" | "doing" | "done",
      ownerId: "Jan Kowalski", // Mocked owner
    };

    storyManager.addStory(createStory);
    const allStories = storyManager.getStories();
    setStories(allStories.filter((story) => story.projectId === projectId));

    // Clear form fields
    setNewStory({ name: "", description: "", priority: "low", state: "to do" });
  };

  // Edit Story Function
  
  const updateStateStory = (updateStory: Story, state:  "to do" | "doing" | "done"): void => {

     
      updateStory.state=state;
      storyManager.updateStory(updateStory); 
    const allStories = storyManager.getStories();
    setStories(allStories.filter((story) => story.projectId === projectId));
  };

  // Delete Story Function
  const deleteStory = (id: string): void => {
    storyManager.deleteStory(id);
    const allStories = storyManager.getStories();
    setStories(allStories.filter((story) => story.projectId === projectId));
  };

  return (
    <div>
      <h2>Dodaj nową Historyjkę</h2>
      <input
        type="text"
        placeholder="Nazwa"
        value={newStory.name || ""}
        onChange={(e) => setNewStory({ ...newStory, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Opis"
        value={newStory.description || ""}
        onChange={(e) => setNewStory({ ...newStory, description: e.target.value })}
      />
      <select
        value={newStory.priority}
        onChange={(e) => setNewStory({ ...newStory, priority: e.target.value as "low" | "midium" | "high" })}
      >
        <option value="low">Niski</option>
        <option value="midium">Średni</option>
        <option value="high">Wysoki</option>
      </select>
      <select
        value={newStory.state}
        onChange={(e) => setNewStory({ ...newStory, state: e.target.value as "to do" | "doing" | "done" })}
      >
        <option value="to do">Do zrobienia</option>
        <option value="doing">W trakcie</option>
        <option value="done">Zakończone</option>
      </select>
      <button onClick={addStory}>Dodaj</button>

      <h2>Lista Historyjek</h2>
      <button onClick={() => setFilter("all")}>Wszystkie</button>
      <button onClick={() => setFilter("to do")}>Do zrobienia</button>
      <button onClick={() => setFilter("doing")}>W trakcie</button>
      <button onClick={() => setFilter("done")}>Zamknięte</button>

      <ul>
        {filteredStories.map((story) => (
          <li key={story.id}>
            <strong>{story.name}</strong>: {story.description} ({story.state}) - Priorytet: {story.priority}
            <button onClick={() => deleteStory(story.id)}>Usuń</button>
            <button onClick={() => updateStateStory(story, "to do")}>Do zrobienia</button>
            <button onClick={() => updateStateStory(story,"doing")}>W trakcie</button>
            <button onClick={() => updateStateStory(story,"done")}>Zamknij</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StoryList;
