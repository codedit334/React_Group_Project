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

  const missions = useSelector((state) => state.missions);

  useEffect(() => {
    if (missions.status === 'idle') dispatch(fetchMissions());
  }, [dispatch]);

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
          <thead className="t-headers">
            <tr>
              <th>Mission</th>
              <th>Description</th>
              <th>Status</th>
              <th>Reserve</th>
            </tr>
          </thead>
          <tbody>
            {missions.missions
              && missions.missions.map((mission) => (
                <tr key={mission.mission_id + missions.missions.indexOf(mission)}>
                  <td className="m-name">{mission.mission_name}</td>
                  <td className="m-desc">{mission.description}</td>
                  <td className="center">{mission.reserved ? <span className="active-reserved">  Active Member  </span> : <span className="m-reserved">NOT A MEMBER </span>}</td>
                  <td className="center">
                    {mission.reserved ? (
                      <button
                        type="button"
                        onClick={() => handleCancelClick(mission.mission_id)}
                        className="active-btn"
                      >
                        Leave Mission
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleReserveClick(mission.mission_id)}
                        className="btn"
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
