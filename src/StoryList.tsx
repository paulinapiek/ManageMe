import React, { useEffect } from "react";
import { useStoryManager } from "./StoryManager";
import { Story } from "./Story";
import KanbanBoard from "./KanbanBoard";


const StoryList = ({ projectId }: { projectId: string }) => {
  const { stories, fetchStories, updateStory, addStory, deleteStory } = useStoryManager();

  useEffect(() => {
  fetchStories();
    }, []);
const UpdateStoryState=(story: Story, state : "to do" | "doing" | "done")=>{
    updateStory(story, state);

}
  const handleAddStory = async () => {
    const newStory : Story= {
      id: Date.now().toString(),
      name: "New Story",
      description: "Story Description",
      priority: "low",
      projectId,
      createdAt: new Date().toISOString(),
      state: "to do",
      ownerId: "1",
      assignedUserId: "1",
    };
    await addStory(newStory);
  };

  const filteredStories = stories.filter((story) => story.projectId === projectId);

  return (
    <div>
      <h2>Lista historyjek</h2>
      <button onClick={handleAddStory}>dodaj historyjke</button>
      <ul>
        {filteredStories.map((story) => (
          <li key={story.id}>
            {story.name} - {story.description}
            <button onClick={() => deleteStory(story.id)}>Usuń</button>
          </li>
        ))}
      </ul> 
      <KanbanBoard stories={stories} onUpdateStoryState={UpdateStoryState} />
    </div>
  );
};

export default StoryList;
