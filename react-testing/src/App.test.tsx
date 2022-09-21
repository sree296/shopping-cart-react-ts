import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('should have name - Sreeni', () => {
  render(<App />);
  const labelText = screen.getByText(/sreenivasulu gattu/i);
  expect(labelText).toBeInTheDocument();
})
