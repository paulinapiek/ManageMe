import React from "react";
import { Task } from "./Task";
import "./KanbanBoard.css"; // Import the CSS file

interface KanbanBoardProps {
  tasks: Task[];
  onUpdateTaskState: (task: Task, newState: "to do" | "doing" | "done") => void;
  editTask: (taskId: string) => void;
  deleteTask: (taskId: string) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks, onUpdateTaskState, editTask, deleteTask }) => {
  const groupedTasks = {
    "to do": tasks.filter(task => task.state === "to do"),
    doing: tasks.filter(task => task.state === "doing"),
    done: tasks.filter(task => task.state === "done"),
  };

  return (
    <div className="kanban-board">
      {Object.entries(groupedTasks).map(([state, stateTasks]) => (
        <div key={state} className="kanban-column">
          <h4>{state.toUpperCase()}</h4>
          <ul>
            {stateTasks.map(task => (
              <li key={task.id}>
                <strong>{task.name}</strong>: {task.description} - Priorytet: {task.priority}
                {task.state === "doing" && <div>- Start: {task.startDate}</div>}
                {task.state === "done" && <div>- Zakończenie: {task.completedDate}</div>}
                {state !== "done" && (
                  <button onClick={() => onUpdateTaskState(task, state === "to do" ? "doing" : "done")}>
                    Przenieś do {state === "to do" ? "Doing" : "Done"}
                  </button>
                )}
                <button onClick={() => editTask(task.id)}>Edytuj</button>
                <button className="delete" onClick={() => deleteTask(task.id)}>Usuń</button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;