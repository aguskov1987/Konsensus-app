import React from 'react';
import { screen } from '@testing-library/react';
import App from './App';
import {render} from './AppState/TestUtils';
import {AppState} from "./AppState/AppState";

test('renders learn react link', () => {
  render(<App />, {initialState: new AppState()});
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
