import { getFirestore, collection, addDoc, getDocs, connectFirestoreEmulator, query, limit, where } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { Project } from "./Project" ;

const firebaseConfig = {
  projectId: "local-emulator"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
connectFirestoreEmulator(db, "localhost", 8080);

const seedProjects = async () => {
  const projectsCollection = collection(db, "projects");
  const querySnapshot = await getDocs(collection(db, "projects"));
   if( querySnapshot.docs.length > 0) {
    return
   }
  const exampleProjects: Project[] = [
    { id: "1", name: "Aplikacja mobilna", description: "Tworzenie nowej aplikacji mobilnej w React Native" },
    { id: "2", name: "Strona internetowa", description: "Projektowanie i wdrażanie nowej strony dla startupu" },
    { id: "3", name: "Analiza danych", description: "Eksploracja danych z wykorzystaniem Python i Pandas" }
  ];

  for (const project of exampleProjects) {
    await addDoc(projectsCollection, project);
  }

  console.log("Dane projektów dodane do Firestore Emulatora!");
};

const getDocument = async (id: string, documetType: string) => {
  const projectsRef = collection(db, documetType);
  
  // Wyszukaj tylko **jeden** dokument pasujący do nazwy
  const q = query(projectsRef, where("id", "==", id), limit(1));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    console.log(`Brak projektów o nazwie: ${id}`);
    return "";
  }

  // Pobierz pierwszy (i jedyny) dokument
  const document = querySnapshot.docs[0];
  return document.id;
};

seedProjects();
export {db, getDocument};