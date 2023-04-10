import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { reserveRocket, cancelReservation } from '../../redux/rockets/rocketsSlice';

export default function RocketLi({ rocket }) {
  const dispatch = useDispatch();
  return (
    <li>
      <img src={rocket.flickr_image} alt={rocket.rocket_name} />
      <h2>{rocket.rocket_name}</h2>
      {rocket.reserved && <div>Reserved</div>}
      <p>{rocket.description}</p>
      {rocket.reserved && <button type="button" onClick={() => dispatch(cancelReservation(rocket.id))}>cancel Reservation</button>}
      {!rocket.reserved && <button type="button" onClick={() => dispatch(reserveRocket(rocket.id))}>Reserve Rocket</button>}
    </li>
  );
}

RocketLi.propTypes = {
  rocket: PropTypes.shape({
    id: PropTypes.number,
    rocket_name: PropTypes.string,
    description: PropTypes.string,
    flickr_image: PropTypes.string,
    reserved: PropTypes.bool,
  }).isRequired,
};
