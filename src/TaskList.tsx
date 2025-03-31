import React, { useState, useEffect } from "react";
import { Task } from "./Task";
import { TaskManager } from "./TaskManager";
import KanbanBoard from "./KanbanBoard";

const TaskList = ({ storyId }: { storyId: string }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"to do" | "doing" | "done" | "all">("all");
  const taskManager = new TaskManager();

  useEffect(() => {
    const allTasks = taskManager.getTasksByStoryId(storyId);
    setTasks(allTasks);
  }, [storyId]);

  const filteredTasks = tasks.filter((task) => filter === "all" || task.state === filter);

  const addTask = (): void => {
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
    setTasks(taskManager.getTasksByStoryId(storyId));
  };

    function UpdateState(task: Task, newState: "to do" | "doing" | "done"): void {
        taskManager.updateTask(task, newState);
        setTasks(taskManager.getTasksByStoryId(storyId));
    }

    function editTask(taskId: string): void {
        throw new Error("Function not implemented.");
    }

    function deleteTask(taskId: string): void {
        taskManager.deleteTask(taskId);
        setTasks(taskManager.getTasksByStoryId(storyId));
    }

  return (
    <div>
      <h4>Zadania dla historyjki</h4>
      <button onClick={()=>addTask()}></button>
      <KanbanBoard tasks={tasks} onUpdateTaskState={UpdateState} editTask={editTask} deleteTask={deleteTask}/>
      {/* <button onClick={() => setFilter("all")}>Wszystkie</button>
      <button onClick={() => setFilter("to do")}>Do zrobienia</button>
      <button onClick={() => setFilter("doing")}>W trakcie</button>
      <button onClick={() => setFilter("done")}>Zakończone</button> */}
      </div>)};


export default TaskList;