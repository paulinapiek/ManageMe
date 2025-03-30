import React from 'react';
import { render, screen } from '@testing-library/react';
import { ProjectManager2 } from './ProjectManager2';

test('ProjectManager stores and retrieves the active project correctly', () => {
  const projectManager = new ProjectManager2();
  
  // Set an active project
  projectManager.setActiveProject('123');
  
  // Retrieve the active project and assert
  const activeProject = projectManager.getActiveProject();
  expect(activeProject).toBe('123');
});
