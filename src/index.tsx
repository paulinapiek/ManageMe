import React, { use } from 'react';
import ReactDOM from 'react-dom/client';
import './components/styles/index.css';
import reportWebVitals from './tests/reportWebVitals';
import ProjectManager from './components/ProjectManager';
import UserProfile from './components/UserProfile';
import { StoryProvider } from './services/StoryManager'; // Import StoryProvider


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <React.StrictMode>
    <StoryProvider> {/* Wrapping components with StoryProvider */}
      <UserProfile />
      <ProjectManager />
    </StoryProvider>
  </React.StrictMode>
);

reportWebVitals();
