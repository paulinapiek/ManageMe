import React from "react";
import { Task } from "./Task";

interface KanbanBoardProps {
  tasks: Task[];
  onUpdateTaskState: (task: Task, newState: "to do" | "doing" | "done") => void;
  editTask: (taskId: string)=>void;
  deleteTask: (taskId: string)=> void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks, onUpdateTaskState , editTask, deleteTask}) => {
  const groupedTasks = {
    "to do": tasks.filter(task => task.state === "to do"),
    doing: tasks.filter(task => task.state === "doing"),
    done: tasks.filter(task => task.state === "done"),
  };

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      {Object.entries(groupedTasks).map(([state, stateTasks]) => (
        <div key={state} style={{ border: "1px solid black", padding: "10px", width: "300px" }}>
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
                <button onClick={() => deleteTask(task.id)}>Usuń</button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
