import { render, screen } from '@testing-library/react';
import App from './App';

test('renders home page title', () => {
  render(<App />);
  const titleElements = screen.getAllByText(/Casa nei Pini/i);
  expect(titleElements.length).toBeGreaterThan(0);
});
