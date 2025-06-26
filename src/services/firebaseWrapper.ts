import { getFirestore, collection, addDoc, getDocs, connectFirestoreEmulator, query, limit, where } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { Project } from "../models/Project" ;
import { Story } from "../models/Story";
import { Task } from "../models/Task";

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

const seedUserStories = async () => {
  const userStoriesCollection = collection(db, "stories");
  const querySnapshot = await getDocs(collection(db, "stories"));
   if( querySnapshot.docs.length > 0) {
    return
   }
  const exampleStories: Story[] = [
 
  // 🔹 Stories dla projektu "Aplikacja mobilna"
  {
    id: "101",
    name: "Projekt UI/UX",
    description: "Zaprojektowanie interfejsu użytkownika dla aplikacji mobilnej.",
    priority: "high",
    projectId: "1",
    createdAt: new Date().toISOString(),
    state: "to do",
    ownerId: "Jan Kowalski",
    assignedUserId: "Anna Nowak",
  },
  {
    id: "102",
    name: "Integracja API",
    description: "Połączenie aplikacji z backendem i testowanie API.",
    priority: "medium",
    projectId: "1",
    createdAt: new Date().toISOString(),
    state: "doing",
    ownerId: "Jan Kowalski",
    startDate: new Date().toISOString(),
  },

  // 🔹 Stories dla projektu "Strona internetowa"
  {
    id: "201",
    name: "Projektowanie strony głównej",
    description: "Stworzenie responsywnego layoutu strony głównej.",
    priority: "high",
    projectId: "2",
    createdAt: new Date().toISOString(),
    state: "to do",
    ownerId: "Kamil Wiśniewski",
  },
  {
    id: "202",
    name: "Optymalizacja SEO",
    description: "Poprawa widoczności strony w wyszukiwarkach.",
    priority: "medium",
    projectId: "2",
    createdAt: new Date().toISOString(),
    state: "doing",
    ownerId: "Kamil Wiśniewski",
    startDate: new Date().toISOString(),
  },

  // 🔹 Stories dla projektu "Analiza danych"
  {
    id: "301",
    name: "Zbieranie danych",
    description: "Pobranie i oczyszczenie danych do analizy.",
    priority: "high",
    projectId: "3",
    createdAt: new Date().toISOString(),
    state: "to do",
    ownerId: "Zofia Nowak",
  },
  {
    id: "302",
    name: "Modelowanie danych",
    description: "Tworzenie modeli predykcyjnych na podstawie danych.",
    priority: "medium",
    projectId: "3",
    createdAt: new Date().toISOString(),
    state: "doing",
    ownerId: "Zofia Nowak",
    startDate: new Date().toISOString(),
  },
];


  for (const story of exampleStories) {
    await addDoc(userStoriesCollection, story);
  }

  console.log("Dane projektów dodane do Firestore Emulatora!");
};

const seedTasks = async () => {
  const tasksCollection = collection(db, "tasks");
  const querySnapshot = await getDocs(collection(db, "tasks"));
   if( querySnapshot.docs.length > 0) {
    return
   }
  const exampleTasks: Task[] = [
  // 🔹 Tasks dla historyjki "Projekt UI/UX" (Story ID: 101)
  {
    id: "1011",
    name: "Badanie potrzeb użytkowników",
    description: "Przeprowadzenie ankiety i wywiadów z użytkownikami.",
    priority: "high",
    storyId: "101",
    estimatedTime: "5h",
    state: "to do",
    createdAt: new Date().toISOString(),
    assignedUserId: "Anna Nowak",
  },
  {
    id: "1012",
    name: "Tworzenie makiet",
    description: "Projektowanie makiet interfejsu w Figma.",
    priority: "midium",
    storyId: "101",
    estimatedTime: "8h",
    state: "doing",
    createdAt: new Date().toISOString(),
    startDate: new Date().toISOString(),
    assignedUserId: "Anna Nowak",
  },

  // 🔹 Tasks dla historyjki "Integracja API" (Story ID: 102)
  {
    id: "1021",
    name: "Konfiguracja połączenia z backendem",
    description: "Ustawienie autoryzacji i połączenia z API.",
    priority: "high",
    storyId: "102",
    estimatedTime: "6h",
    state: "to do",
    createdAt: new Date().toISOString(),
    assignedUserId: "Jan Kowalski",
  },
  {
    id: "1022",
    name: "Testowanie endpointów API",
    description: "Sprawdzenie poprawności odpowiedzi API.",
    priority: "midium",
    storyId: "102",
    estimatedTime: "4h",
    state: "doing",
    createdAt: new Date().toISOString(),
    startDate: new Date().toISOString(),
    assignedUserId: "Jan Kowalski",
  },

  // 🔹 Tasks dla historyjki "Projektowanie strony głównej" (Story ID: 201)
  {
    id: "2011",
    name: "Tworzenie layoutu",
    description: "Projektowanie układu strony głównej.",
    priority: "high",
    storyId: "201",
    estimatedTime: "7h",
    state: "to do",
    createdAt: new Date().toISOString(),
    assignedUserId: "Kamil Wiśniewski",
  },
  {
    id: "2012",
    name: "Implementacja CSS",
    description: "Stylowanie strony głównej zgodnie z projektem.",
    priority: "midium",
    storyId: "201",
    estimatedTime: "5h",
    state: "doing",
    createdAt: new Date().toISOString(),
    startDate: new Date().toISOString(),
    assignedUserId: "Kamil Wiśniewski",
  },

  // 🔹 Tasks dla historyjki "Optymalizacja SEO" (Story ID: 202)
  {
    id: "2021",
    name: "Analiza słów kluczowych",
    description: "Dobór odpowiednich fraz dla lepszej widoczności.",
    priority: "high",
    storyId: "202",
    estimatedTime: "3h",
    state: "to do",
    createdAt: new Date().toISOString(),
    assignedUserId: "Kamil Wiśniewski",
  },
  {
    id: "2022",
    name: "Poprawa struktury HTML",
    description: "Dostosowanie znaczników HTML pod SEO.",
    priority: "midium",
    storyId: "202",
    estimatedTime: "4h",
    state: "doing",
    createdAt: new Date().toISOString(),
    startDate: new Date().toISOString(),
    assignedUserId: "Kamil Wiśniewski",
  },

  // 🔹 Tasks dla historyjki "Zbieranie danych" (Story ID: 301)
  {
    id: "3011",
    name: "Pobranie danych z API",
    description: "Zbieranie danych z zewnętrznych źródeł.",
    priority: "high",
    storyId: "301",
    estimatedTime: "6h",
    state: "to do",
    createdAt: new Date().toISOString(),
    assignedUserId: "Zofia Nowak",
  },
  {
    id: "3012",
    name: "Czyszczenie danych",
    description: "Usuwanie błędnych i niekompletnych rekordów.",
    priority: "midium",
    storyId: "301",
    estimatedTime: "5h",
    state: "doing",
    createdAt: new Date().toISOString(),
    startDate: new Date().toISOString(),
    assignedUserId: "Zofia Nowak",
  },

  // 🔹 Tasks dla historyjki "Modelowanie danych" (Story ID: 302)
  {
    id: "3021",
    name: "Tworzenie modelu regresyjnego",
    description: "Budowa modelu predykcyjnego na podstawie danych.",
    priority: "high",
    storyId: "302",
    estimatedTime: "7h",
    state: "to do",
    createdAt: new Date().toISOString(),
    assignedUserId: "Zofia Nowak",
  },
  {
    id: "3022",
    name: "Walidacja modelu",
    description: "Testowanie skuteczności modelu na nowych danych.",
    priority: "midium",
    storyId: "302",
    estimatedTime: "6h",
    state: "doing",
    createdAt: new Date().toISOString(),
    startDate: new Date().toISOString(),
    assignedUserId: "Zofia Nowak",
  },
];


  for (const task of exampleTasks) {
    await addDoc(tasksCollection, task);
  }

  console.log("Dane zadań dodane do Firestore Emulatora!");
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
seedUserStories();
seedTasks();
export {db, getDocument};
