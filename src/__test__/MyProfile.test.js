import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import '@testing-library/jest-dom';
import MyProfile from '../components/MyProfile';

const mockStore = configureMockStore([]);

describe('MyProfile component', () => {
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
            reserved: true,
          },
        ],
      },
      missions: {
        missions: [
          {
            mission_id: '1',
            mission_name: 'Test Mission x',
            description: 'Test Mission x description',
            reserved: true,
          },
          {
            mission_id: '2',
            mission_name: 'Test Mission y',
            description: 'Test Mission y description',
            reserved: false,
          },
        ],
      },
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
            reserved: true,
          },
        ],
      },
    });

    store.dispatch = jest.fn();
  });

  it('should render the Rockets component', () => {
    render(
      <Provider store={store}>
        <MyProfile />
      </Provider>,
    );

    expect(screen.getByText('Test Mission x')).toBeInTheDocument();
    expect(screen.getByText('Test Rocket y')).toBeInTheDocument();
    expect(screen.getByText('Test Dragons y')).toBeInTheDocument();
  });
});