import React from 'react';
import PropTypes from 'prop-types';

export default function RocketLi({ rocket }) {
  return (
    <li>
      <img src={rocket.flickr_image} alt={rocket.rocket_name} />
      <h2>{rocket.rocket_name}</h2>
      <p>{rocket.description}</p>
      <button type="button">Reserve Rocket</button>
    </li>
  );
}

RocketLi.propTypes = {
  rocket: PropTypes.shape({
    id: PropTypes.number,
    rocket_name: PropTypes.string,
    description: PropTypes.string,
    flickr_image: PropTypes.string,
  }).isRequired,
};
