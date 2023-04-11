import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { cancel } from '../redux/Dragons/dragonSlice';
import { cancelReservation } from '../redux/rockets/rocketsSlice';
import { leaveMission } from '../redux/Missions/missionsSlice';

function IsMissionTaken({ mission }) {
  const dispatch = useDispatch();

  return (
    <div>
      {mission.reserved ? (
        <div key={mission.mission_id}>
          <div>{mission.mission_name}</div>
          <button type="button" onClick={() => dispatch(leaveMission(mission.mission_id))}>Leave Mission</button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

function IsRocketReserved({ rocket }) {
  const dispatch = useDispatch();

  return (
    <div>
      {rocket.reserved ? (
        <div key={rocket.id}>
          <div>{rocket.rocket_name}</div>
          <button
            type="button"
            onClick={() => dispatch(cancelReservation(rocket.id))}
          >
            Cancel Reservation
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

function IsDragonReserved({ dragon }) {
  const dispatch = useDispatch();

  return (
    <div>
      {dragon.reserved ? (
        <div key={dragon.id}>
          <div>{dragon.name}</div>
          <button type="button" onClick={() => dispatch(cancel(dragon.id))}>
            Cancel Reservation
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default function MyProfile() {
  const { missions, status } = useSelector((state) => state.missions);
  const { rockets, isRocketLoading } = useSelector((state) => state.rockets);
  const { dragons, isLoading } = useSelector((state) => state.dragons);

  return (
    <div>
      <div>
        <h2>My Missions</h2>
        <p id="mission-not-taken" />
        {missions && missions.find((mission) => 'reserved' in mission && mission.reserved === true) ? (
          missions.map((mission) => (
            <div key={mission.mission_id}>
              <IsMissionTaken mission={mission} />
            </div>
          ))
        ) : (
          <div>No Missions Taken</div>
        )}
        {status === 'loading' && <div>Loading...</div>}
      </div>

      <div>
        <h2>My Rockets</h2>
        {rockets
        && rockets.find(
          (rocket) => 'reserved' in rocket && rocket.reserved === true,
        ) ? (
            rockets.map((rocket) => (
              <div key={rocket.id}>
                <IsRocketReserved rocket={rocket} />
              </div>
            ))
          ) : (
            <div>No Rockets Reserved</div>
          )}
        {isRocketLoading && <div>Loading...</div>}
      </div>

      <div>
        <h2>My Dragons</h2>
        {dragons
        && dragons.find(
          (dragon) => 'reserved' in dragon && dragon.reserved === true,
        ) ? (
            dragons.map((dragon) => (
              <div key={dragon.id}>
                <IsDragonReserved dragon={dragon} />
              </div>
            ))
          ) : (
            <div>No Dragons Reserved</div>
          )}
        {isLoading && <div>Loading...</div>}
      </div>
    </div>
  );
}

IsMissionTaken.propTypes = {
  mission: PropTypes.shape({
    mission_id: PropTypes.string,
    mission_name: PropTypes.string,
    reserved: PropTypes.bool,
  }).isRequired,
};

IsRocketReserved.propTypes = {
  rocket: PropTypes.shape({
    id: PropTypes.number,
    rocket_name: PropTypes.string,
    reserved: PropTypes.bool,
  }).isRequired,
};

IsDragonReserved.propTypes = {
  dragon: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    reserved: PropTypes.bool,
  }).isRequired,
};
