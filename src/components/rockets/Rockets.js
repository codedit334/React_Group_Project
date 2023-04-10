import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRockets } from '../../redux/rockets/rocketsSlice';
import RocketLi from './RocketLi';

export default function Rockets() {
  const { rockets, isRocketLoading } = useSelector((state) => state.rockets);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRockets());
  }, [dispatch]);

  if (isRocketLoading) {
    return (<h2>Loading...</h2>);
  }

  return (
    <ul>
      {rockets.map((rocket) => <RocketLi key={rocket.id} rocket={rocket} />)}
    </ul>
  );
}
