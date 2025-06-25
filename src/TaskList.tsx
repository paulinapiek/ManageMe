import React, { useState, useEffect } from "react";
import { Task } from "./Task";
import { TaskManager } from "./TaskManager";
import KanbanBoard from "./KanbanBoard";



const TaskList = ({ storyId }: { storyId: string }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"to do" | "doing" | "done" | "all">("all");
  const taskManager = new TaskManager();

  useEffect(() => {
  fetchData();
  }, [storyId]);
  const fetchData = async () => {
    const allTasks = await taskManager.getTasksByStoryId(storyId);
    setTasks(allTasks);
  };
  const filteredTasks = tasks.filter((task) => filter === "all" || task.state === filter);

  const addTask = async (): Promise <void> => {
    const newTask: Task = {
      id: Date.now().toString(),
      name:  "Nowe zadanie",
      description: "opis zadania",
      priority:  "low",
      storyId,
      estimatedTime:  "1h",
      createdAt: new Date().toISOString(),
      state:  "to do",
    };
    taskManager.addTask(newTask);
    setTasks(await taskManager.getTasksByStoryId(storyId));
  };

   const updateState = async (task: Task, newState: "to do" | "doing" | "done"): Promise<void> => {
        await taskManager.updateTask(task, newState);
        setTasks(await taskManager.getTasksByStoryId(storyId));
    }
     const editTask = async (task: Task): Promise<void> => {
   setNewTask(task);
   setEditTaskId(task.id);
   };

const [newTask, setNewTask] = useState<Partial<Task>>({});
const [editTaskId, setEditTaskId] = useState<string | null>(null);


    //  const editTask = async (taskId: string): Promise<void> => {
    //     throw new Error("Function not implemented.");
    // }

    // 
   const deleteTask = async (taskId: string): Promise<void> => {
 const confirmed = window.confirm("Czy na pewno chcesz usunąć to zadanie?");
  if (confirmed) {
   await taskManager.deleteTask(taskId);
       setTasks(await taskManager.getTasksByStoryId(storyId));
  }
 };

    

  async function saveEditedTask (): Promise<void> {
   
    if (!editTaskId || !newTask) return;

    // Prepare the updated task object
    // const updatedTask: Task = {
    //   ...(tasks.find((t) => t.id === editTaskId) as Task),
    //   ...newTask,
    //   id: editTaskId,
    //   storyId: newTask.storyId || storyId,
    //   name: newTask.name || "",
    //   description: newTask.description || "",
    //   priority: newTask.priority || "low",
    //   estimatedTime: newTask.estimatedTime || "",
    //   state: newTask.state || "to do",
    //   createdAt: newTask.createdAt || new Date().toISOString(),
    //   startDate: newTask.startDate,
    //   completedDate: newTask.completedDate,
    //   assignedUserId: newTask.assignedUserId,
    // };

    await taskManager.editTask(newTask as Task);
    setTasks(await taskManager.getTasksByStoryId(storyId));
    setEditTaskId(null);
    setNewTask({});
  }

  function cancelEdit() {
    setEditTaskId(null);
    setNewTask({});
  }

  return (
    <div>
      <h4>Zadania dla historyjki</h4>
             <div>
    <h2>{editTaskId ? "Edytuj Zadanie" : "Dodaj Nowe Zadanie"}</h2>
    <input
      type="text"
      placeholder="Nazwa zadania"
      value={newTask.name || ""}
      onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
    />
    <textarea
      placeholder="Opis zadania"
      value={newTask.description || ""}
      onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
    />
   
    <input
      type="text"
      placeholder="Przewidywany czas (np. 5h)"
      value={newTask.estimatedTime || ""}
      onChange={(e) => setNewTask({ ...newTask, estimatedTime: e.target.value })}
    />
    <select
      value={newTask.priority || "low"}
      onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as "low" | "midium" | "high" })}
    >
      <option value="low">Niski</option>
      <option value="midium">Średni</option>
      <option value="high">Wysoki</option>
    </select>
    <select
      value={newTask.state || "to do"}
      onChange={(e) => setNewTask({ ...newTask, state: e.target.value as "to do" | "doing" | "done" })}
    >
      <option value="to do">Do zrobienia</option>
      <option value="doing">W trakcie</option>
      <option value="done">Zamknięte</option>
    </select>
    <br></br><label>Data rozpoczęcia:</label>
    <input
      type="datetime-local"
      placeholder="Data rozpoczęcia"
      value={newTask.startDate || ""}
      onChange={(e) => setNewTask({ ...newTask, startDate: e.target.value })}
    />
    <input
      type="datetime-local"
      placeholder="Data zakończenia"
      value={newTask.completedDate || ""}
      onChange={(e) => setNewTask({ ...newTask, completedDate: e.target.value })}
    />
    <input
      type="text"
      placeholder="ID przypisanego użytkownika"
      value={newTask.assignedUserId || ""}
      onChange={(e) => setNewTask({ ...newTask, assignedUserId: e.target.value })}
    />
    {editTaskId ? (
      <>
        <button onClick={saveEditedTask}>Zapisz Zmiany</button>
        <button onClick={cancelEdit}>Anuluj</button>
      </>
    ) : (
      <button onClick={addTask}>Dodaj Zadanie</button>
    )}
  </div>
      <KanbanBoard tasks={tasks} onUpdateTaskState={updateState} editTask={editTask} deleteTask={deleteTask}/>
 
      </div>)
};


export default TaskList;