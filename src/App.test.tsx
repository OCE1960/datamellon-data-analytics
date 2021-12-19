import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './state-management/store';
import Home from "../src/pages/Home"

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      <Home />
    </Provider>
  );

  expect(getByText(/Please Make a Post Request/i)).toBeInTheDocument();
});
