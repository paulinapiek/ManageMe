import React from 'react';
import { render, screen } from '@testing-library/react';
import ProjectManager from './ProjectManager';

test('renders learn react link', () => {
  render(<ProjectManager />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
