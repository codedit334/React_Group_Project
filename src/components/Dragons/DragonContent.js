import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { cancel, reserve } from '../../redux/Dragons/dragonSlice';

export default function DragonContent({ dragon }) {
  const dispatch = useDispatch();
  return (
    <li className="main-container">
      <img src={dragon.flickr_image} alt={dragon.name} />
      <div className="details-container">
        <h3>{dragon.name}</h3>
        <p>
          {dragon.reserved && <span className="reserve">Reserved</span>}
          {' '}
          {dragon.description}
        </p>
        {dragon.reserved && (
          <button
            type="button"
            onClick={() => {
              dispatch(cancel(dragon.id));
            }}
            className="cancel-btn"
          >
            Cancel Reservation
          </button>
        )}
        {!dragon.reserved && (
          <button
            type="button"
            onClick={() => {
              dispatch(reserve(dragon.id));
            }}
            className="reseved-btn"
          >
            Reserve Dragon
          </button>
        )}
      </div>
    </li>
  );
}

DragonContent.propTypes = {
  dragon: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    flickr_image: PropTypes.string,
    reserved: PropTypes.bool,
  }).isRequired,
};
