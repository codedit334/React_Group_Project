import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Mission from '../components/Mission';
import '@testing-library/jest-dom';
import { reserveMission } from '../redux/Missions/missionsSlice';

const mockStore = configureMockStore([]);

describe('Mission component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      missions: {
        missions: [
          {
            mission_id: 1,
            mission_name: 'Test Mission x',
            description: 'Test Mission x description',
            reserved: false,
          },
          {
            mission_id: 2,
            mission_name: 'Test Mission y',
            description: 'Test Mission y description',
            reserved: false,
          },
        ],
        status: 'succeeded',
      },
    });

    store.dispatch(reserveMission(1));
  });

  it('should render the Mission component', () => {
    render(
      <Provider store={store}>
        <Mission />
      </Provider>,
    );

    expect(screen.getByText('Test Mission x')).toBeInTheDocument();
    expect(screen.getByText('Test Mission y')).toBeInTheDocument();
  });

  it('test for Mission component with button click', () => {
    const btn = render(
      <Provider store={store}>
        <Mission />
      </Provider>,
    );

    fireEvent.click(btn.getAllByText('Join Mission')[0]);
   
    expect(store.getActions()[0]).toEqual({ type: 'missions/reserveMission', payload: 1 });
  });
});