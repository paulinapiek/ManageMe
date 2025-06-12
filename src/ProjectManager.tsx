import React, { useState, useEffect } from "react";
import "./ProjectManager.css"; 


import { db, getDocument } from "./firebaseWrapper";
import { collection, getDocs, addDoc, deleteDoc, doc, getDoc, updateDoc} from "firebase/firestore";
import { Project } from "./Project";
import StoryList from "./StoryList";
import ActiveProject from "./ActiveProjects";

const ProjectManager = () => {
  const [projects, setProjects] = useState<Project[]>([]);
   const [name, setName] = useState<string>(""); // State for project name
  const [description, setDescription] = useState<string>("");
  

  useEffect(() => {
   
    fetchData();
  }, []);
const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "projects"));
      setProjects(querySnapshot.docs.map(doc => doc.data() as Project));
    };

  const handleAddProject = async () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: name,
      description: description
    };
    await addDoc(collection(db, "projects"),  newProject);
    fetchData()
  };

  const handleDeleteProject = async (id: string) => {
    const documentId = await getDocument(id, "projects");
    await deleteDoc(doc(db, "projects", documentId));
    await fetchData()
    // api.deleteProject(id);
    // setProjects(api.getProjects());
  };
  const updateProject = async (id: string, updatedData: Partial<Project>) => {
  const documentId = await getDocument(id, "projects");
  const docRef = doc(db, "projects", documentId);
  await updateDoc(docRef, updatedData);
  await fetchData();
  console.log(`Projekt o ID ${id} został zaktualizowany.`);
};


 
  return (
    <div>
      <h1>ManagMe</h1>
      <input
        type="text"
        placeholder="Nazwa projektu"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Opis projektu"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleAddProject}>Dodaj Projekt</button>
      <ul>
        {projects.map(project => (
          <li key={project.id}>
            <strong>{project.name}</strong>: {project.description}
            <button onClick={() => handleDeleteProject(project.id)}>Usuń</button>
            <button onClick={() => updateProject(project.id, { name, description })}>Zaktualizuj</button>

          </li>
        ))}
      </ul>
      
      <ActiveProject projects={projects} /> 
    </div>
    
 
  );
};

export default ProjectManager;
