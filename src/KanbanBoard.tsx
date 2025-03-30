import React from "react";
import { Story } from "./Story";

interface KanbanBoardProps {
  stories: Story[];
  onUpdateStoryState: (story: Story, newState: "to do" | "doing" | "done") => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ stories, onUpdateStoryState }) => {
  const groupedStories = {
    "to do": stories.filter(story => story.state === "to do"),
    doing: stories.filter(story => story.state === "doing"),
    done: stories.filter(story => story.state === "done"),
  };

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      {Object.entries(groupedStories).map(([state, stateStories]) => (
        <div key={state} style={{ border: "1px solid black", padding: "10px", width: "300px" }}>
          <h4>{state.toUpperCase()}</h4>
          <ul>
            {stateStories.map(story => (
              <li key={story.id}>
                <strong>{story.name}</strong>: {story.description} - Priorytet: {story.priority} 
                {story.state=="doing" && (<div>-Data rozpoczecia: {story.startDate} </div>
                )}  
                {story.state=="done" && (<div>-Data zakończenia: {story.completedDate} </div>
                )}                
                -

                {state !== "done" && (
                  <div>
                    <button
                      onClick={() => onUpdateStoryState(
                        story,
                        state === "to do" ? "doing" : "done"
                      )}
                      disabled={state === "doing" && !story.assignedUserId}
                    >
                      Przenieś do {state === "to do" ? "Doing" : "Done"}
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
