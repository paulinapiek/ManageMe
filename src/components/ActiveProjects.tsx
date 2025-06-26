import React, { useState } from "react";
import { Project } from "../models/Project";
import {ProjectManager2} from "./ProjectManager2";
import StoryList from "./StoryList";
import KanbanBoard from "./KanbanBoard";

const ActiveProject = ({ projects }: { projects: { id: string; name: string }[] }) => {
  const projectManager = new ProjectManager2();
  const [activeProject, setActiveProject] = useState<string | null>(projectManager.getActiveProject());

  const handleSelect = (id: string) => {
    projectManager.setActiveProject(id);
    setActiveProject(id);
  };

  return (
    <div>
      <h2>Aktualny Projekt:</h2>
      {activeProject && <p>Wybrano: {projects.find(p => p.id === activeProject)?.name}</p>}

      <h3>Wybierz projekt:</h3>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <button onClick={() => handleSelect(project.id)}>{project.name}</button>
          </li>
        ))}
      </ul>
 {/* jesli nie ma zadnego aktywnego projektu to jest null */}
      {activeProject != null ? <StoryList projectId={activeProject} /> : ""}

        
    </div>
  );
};

export default ActiveProject;
