import React, { useState, useEffect } from "react";
import { LocalStorageAPI } from "./LocalStorageAPI";
import { Project } from "./Project";


const ProjectManager = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const api = new LocalStorageAPI();
  const [name, setName] = useState<string>(""); // State for project name
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    setProjects(api.getProjects());
  }, []);

  const handleAddProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: name,
      description: description
    };
    api.addProject(newProject);
    setProjects(api.getProjects());
  };

  const handleDeleteProject = (id: string) => {
    api.deleteProject(id);
    setProjects(api.getProjects());
  };

  return (
    <div>
      <h1>ManagMe</h1>
      <input
        type="text"
        placeholder="Project Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Project Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleAddProject}>Dodaj Projekt</button>
      <ul>
        {projects.map(project => (
          <li key={project.id}>
            <strong>{project.name}</strong>: {project.description}
            <button onClick={() => handleDeleteProject(project.id)}>Usuń</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectManager;
