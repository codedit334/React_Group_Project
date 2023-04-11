import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Rockets from '../components/rockets/Rockets';
import '@testing-library/jest-dom';
import { reserveRocket } from '../redux/rockets/rocketsSlice';

const mockStore = configureMockStore([]);

describe('Rockets component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      rockets: {
        rockets: [
          {
            id: 1,
            rocket_name: 'Test Rocket x',
            description: 'Test Rocket x description',
            flickr_image: '#',
            reserved: false,
          },
          {
            id: 2,
            rocket_name: 'Test Rocket y',
            description: 'Test Rocket y description',
            flickr_image: '#',
            reserved: false,
          },
        ],
      },
    });

    store.dispatch(reserveRocket(1));
  });

  it('should render the Rockets component', () => {
    render(
      <Provider store={store}>
        <Rockets />
      </Provider>,
    );

    expect(screen.getByText('Test Rocket x')).toBeInTheDocument();
    expect(screen.getByText('Test Rocket y')).toBeInTheDocument();
  });

  it('test for Rockets component with button click', () => {
    const btn = render(
      <Provider store={store}>
        <Rockets />
      </Provider>,
    );

    fireEvent.click(btn.getAllByText('Reserve Rocket')[0]);
   
    expect(store.getActions()[0]).toEqual({ type: 'rockets/reserveRocket', payload: 1 })
  });
});