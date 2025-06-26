import React from "react";
import { Task } from "../models/Task";
import "./styles/KanbanBoard.css"; // Import the CSS file
import { UserManager } from "../services/UserManager";

interface KanbanBoardProps {
  tasks: Task[];
  onUpdateTaskState: (task: Task, newState: "to do" | "doing" | "done") => Promise<void>;
  //editTask: (taskId: string) => void;
  editTask: (task: Task) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
 
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks, onUpdateTaskState, editTask, deleteTask }) => {
  const userManager = new UserManager();
  const currentUser = userManager.getUser();
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
                {task.state === "done" && <div>- Start: {task.startDate}- Zakończenie: {task.completedDate}</div>}
                                {
                 (task.state === "doing" && currentUser?.id === task.assignedUserId) 
                 && (
                  <button onClick={() => onUpdateTaskState(task, "done")}>
                    Przenieś do {"Done"}
                  </button>
                )}
              {
                 (task.state === "to do" && currentUser?.role !== "admin")
                 && (
                  <button onClick={() => onUpdateTaskState(task,  "doing" )}>
                    Przenieś do {"Doing"}
                  </button>
                )}
                {/* <button onClick={() => editTask(task.id)}>Edytuj</button> */}
                <button onClick={() => editTask(task)}>Edytuj</button>

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