import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRockets } from '../../redux/rockets/rocketsSlice';
import RocketLi from './RocketLi';
import '../../styles/rockets/rocket.css';

export default function Rockets() {
  const { rockets, isRocketLoading } = useSelector((state) => state.rockets);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!rockets.length) {
      dispatch(getRockets());
    }
  }, [dispatch, rockets]);

  if (isRocketLoading) {
    return (<h2>Loading...</h2>);
  }

  return (
    <ul className="rockets">
      {rockets.map((rocket) => <RocketLi key={rocket.id} rocket={rocket} />)}
    </ul>
  );
}
