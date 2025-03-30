import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import ProjectManager from './ProjectManager';
import UserProfile from './UserProfile';
import { StoryProvider } from './StoryManager'; // Import StoryProvider

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
