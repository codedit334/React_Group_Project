import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Dragons from '../components/Dragons/Dragons';
import '@testing-library/jest-dom';
import { reserve } from '../redux/Dragons/dragonSlice';

const mockStore = configureMockStore([]);

describe('Dragons component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      dragons: {
        dragons: [
          {
            id: '1',
            name: 'Test Dragons x',
            description: 'Test Dragons x description',
            flickr_image: '#',
            reserved: false,
          },
          {
            id: '2',
            name: 'Test Dragons y',
            description: 'Test Dragons y description',
            flickr_image: '#',
            reserved: false,
          },
        ],
      },
    });

    store.dispatch(reserve(1));
  });

  it('should render the Dragons component', () => {
    render(
      <Provider store={store}>
        <Dragons />
      </Provider>,
    );

    expect(screen.getByText('Test Dragons x')).toBeInTheDocument();
    expect(screen.getByText('Test Dragons y')).toBeInTheDocument();
  });

  it('test for Dragon component with button click', () => {
    const btn = render(
      <Provider store={store}>
        <Dragons />
      </Provider>,
    );

    fireEvent.click(btn.getAllByText('Reserve Dragon')[0]);
   
    expect(store.getActions()[0]).toEqual({ type: 'dragons/reserve', payload: 1 })
  });
});