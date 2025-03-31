import React, { useEffect, useState } from "react";
import { Story } from "./Story";
import { useStoryManager } from "./StoryManager";
import  TaskList  from "./TaskList";

const StoryList = ({ projectId }: { projectId: string }) => {
  const [stories, setStories] = useState<Story[]>([]);
  const [newStory, setNewStory] = useState<Partial<Story>>({
    name: "",
    description: "",
    priority: "low",
    state: "to do",
  });
  const [editStoryId, setEditStoryId] = useState<string | null>(null);
  const storyManager = useStoryManager();
 

  useEffect(() => {
    storyManager.fetchStories();
    const allStories = storyManager.stories;
    setStories(allStories.filter((story: { projectId: string; }) => story.projectId === projectId));
  }, [projectId]);

  const addStory = (): void => {
    if (!newStory.name || !newStory.description) {
      alert("Proszę uzupełnić wszystkie pola!");
      return;
    }
    const createStory: Story = {
      id: Date.now().toString(),
      name: newStory.name || "Nowa Historyjka",
      description: newStory.description || "Opis domyślny",
      priority: newStory.priority as "low" | "medium" | "high",
      projectId: projectId,
      createdAt: new Date().toISOString(),
      state: newStory.state as "to do" | "doing" | "done",
      ownerId: "Jan Kowalski", // Domyślna wartość
    };

    storyManager.addStory(createStory);
    setNewStory({ name: "", description: "", priority: "low", state: "to do" });
    const allStories = storyManager.stories;
    setStories(allStories.filter((story: { projectId: string; }) => story.projectId === projectId));
  };

  const deleteStory = (id: string): void => {
    const confirmed = window.confirm("Czy na pewno chcesz usunąć tę historyjkę?");
    if (confirmed) {
      storyManager.deleteStory(id);
      storyManager.fetchStories();
      const allStories = storyManager.stories;
      setStories(allStories.filter((story: { projectId: string; }) => story.projectId === projectId));
    }
  };

  const editStory = (id: string): void => {
    const storyToEdit = stories.find((s) => s.id === id);
    if (storyToEdit) {
      setNewStory(storyToEdit);
      setEditStoryId(id);
      storyManager.updateStory(storyToEdit)
    }
  };

  const saveEditedStory = (): void => {
    if (editStoryId) {
      const updatedStory = { ...newStory, id: editStoryId } as Story;
      storyManager.updateStory(updatedStory);
      setEditStoryId(null);
      setNewStory({ name: "", description: "", priority: "low", state: "to do" });
      const allStories = storyManager.stories;
      setStories(allStories.filter((story: { projectId: string; }) => story.projectId === projectId)); 
    }
  };

  const cancelEdit = (): void => {
    setEditStoryId(null);
    setNewStory({ name: "", description: "", priority: "low", state: "to do" });
  };

  const groupedStories = {
    "to do": stories.filter((story) => story.state === "to do"),
    "doing": stories.filter((story) => story.state === "doing"),
    "done": stories.filter((story) => story.state === "done"),
  };

  return (
    <div>
      <h2>{editStoryId ? "Edytuj Historyjkę" : "Dodaj Nową Historyjkę"}</h2>
      <input
        type="text"
        placeholder="Nazwa"
        value={newStory.name || ""}
        onChange={(e) => setNewStory({ ...newStory, name: e.target.value })}
      />
      <textarea
        placeholder="Opis"
        value={newStory.description || ""}
        onChange={(e) => setNewStory({ ...newStory, description: e.target.value })}
      />
      <select
        value={newStory.priority}
        onChange={(e) => setNewStory({ ...newStory, priority: e.target.value as "low" | "medium" | "high" })}
      >
        <option value="low">Niski</option>
        <option value="medium">Średni</option>
        <option value="high">Wysoki</option>
      </select>
      <select
        value={newStory.state}
        onChange={(e) => setNewStory({ ...newStory, state: e.target.value as "to do" | "doing" | "done" })}
      >
        <option value="to do">Do zrobienia</option>
        <option value="doing">W trakcie</option>
        <option value="done">Zamknięte</option>
      </select>
      {editStoryId ? (
        <>
          <button onClick={saveEditedStory}>Zapisz Zmiany</button>
          <button onClick={cancelEdit}>Anuluj</button>
        </>
      ) : (
        <button onClick={addStory}>Dodaj</button>
      )}

      <h2>Lista Historyjek</h2>
      {["to do", "doing", "done"].map((state) => (
        <div key={state}>
          <h3>{state === "to do" ? "Do zrobienia" : state === "doing" ? "W trakcie" : "Zamknięte"}</h3>
          <ul>
            {groupedStories[state as "to do" | "doing" | "done"].map((story) => (
              <li key={story.id}>
                <strong>{story.name}</strong>: {story.description} - Priorytet: {story.priority}, Data stworzenia: {story.createdAt}
               
                <button onClick={() => editStory(story.id)}>Edytuj</button>
                <button onClick={() => deleteStory(story.id)}>Usuń</button>
                <TaskList storyId ={story.id} />
              </li>             
            ))}
          </ul>
          
        </div>
      ))}
    </div>
  );
};

export default StoryList;
