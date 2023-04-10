import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchMissions,
  reserveMission,
  leaveMission,
} from '../redux/Missions/missionsSlice';
import '../styles/Mission.css';

const myStyle = {
  table: {
    margin: '0 4%',
    borderCollapse: 'collapse',
  },
  th: {
    backgroundColor: 'white',
  },
};

export default function Mission() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMissions());
  }, []);

  const missions = useSelector((state) => state.missions);

  const handleReserveClick = (id) => {
    dispatch(reserveMission(id));
  };
  const handleCancelClick = (id) => {
    dispatch(leaveMission(id));
  };
  return (
    <div>
      {missions.status === 'loading' && <h2>Loading...</h2>}
      {missions.error ? (
        <p>{missions.error}</p>
      ) : (
        <table border={1} style={myStyle.table}>
          <thead>
            <tr>
              <th>Mission Name</th>
              <th>Description</th>
              <th>Status</th>
              <th> Reserve</th>
            </tr>
          </thead>
          <tbody>
            {missions.missions
              && missions.missions.map((mission) => (
                <tr key={mission.mission_id + missions.missions.indexOf(mission)}>
                  <td>{mission.mission_name}</td>
                  <td>{mission.description}</td>
                  <td>{mission.reserved ? 'Active Member' : 'NOT A MEMBER'}</td>
                  <td>
                    {mission.reserved ? (
                      <button
                        type="button"
                        onClick={() => handleCancelClick(mission.mission_id)}
                      >
                        Leave Mission
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleReserveClick(mission.mission_id)}
                      >
                        Join Mission
                      </button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
