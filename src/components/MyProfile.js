import React from 'react';
import { useSelector } from 'react-redux';

export default function MyProfile() {
  const missions = useSelector((state) => state.missions.missions);
  return (
    <div>
      <div>
        <h2>My Missions</h2>
        {missions && missions.map((mission) => mission.reserved && (
          <div key={mission.mission_id}>{mission.mission_name}</div>
        ))}
      </div>
    </div>
  );
}
