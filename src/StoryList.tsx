import React, { useState, useEffect } from "react";
import { Story } from "./Story";
import { StoryManager } from "./StoryManager";

const StoryList = ({ projectId }: { projectId: string }) => {
  const [stories, setStories] = useState<Story[]>([]);
  const [filter, setFilter] = useState<"to do" | "doing" | "done" | "all">("all");

  const storyManager = new StoryManager();

  useEffect(() => {
    const allStories = storyManager.getStories();
    setStories(allStories.filter(story => story.projectId === projectId));
  }, [projectId]);

  const filteredStories = stories.filter(story => filter === "all" || story.state === filter);

    function addStory(): void {
        const createStory: Story = {
            id: "1", // auto generate
            name: "Test1", // do wypelniania
            description: "Test1Description", // do wypelniania
            priority: "low", // do wypelnienia
            projectId: projectId, // przepisanie projecTId
            createdAt: new Date().toISOString(), // auto
            state: "to do", // do wypelnienia
            ownerId: "Jan Kowalski", // sciagniecie uzytkownika informacji
            };
        storyManager.addStory(createStory);
        

        const allStories = storyManager.getStories();
        setStories(allStories.filter(story => story.projectId === projectId));
    }

    // create (zbierajac dane)
    // edit
    // delete
  return (
    <div>
      <h2>Dodaj nowa Historyjek</h2>
      <button onClick={() => addStory()}>Dodaj</button>

      <h2>Lista Historyjek</h2>
      <button onClick={() => setFilter("all")}>Wszystkie</button>
      <button onClick={() => setFilter("to do")}>Do zrobienia</button>
      <button onClick={() => setFilter("doing")}>W trakcie</button>
      <button onClick={() => setFilter("done")}>Zamknięte</button>

      <ul>
        {filteredStories.map(story => (
          <li key={story.id}>
            <strong>{story.name}</strong>: {story.description} ({story.state})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StoryList;