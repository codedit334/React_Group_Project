import React, { useEffect } from 'react';
import '../../styles/Dragons.css';
import { useSelector, useDispatch } from 'react-redux';

import { fetchDragons } from '../../redux/Dragons/dragonSlice';
import DragonContent from './DragonContent';

const Dragons = () => {
  const { dragons, isLoading } = useSelector((state) => state.dragons);
  const dispatch = useDispatch();
  useEffect(
    () => {
      if (!dragons.length) {
        dispatch(fetchDragons());
      }
    },
    [dispatch, dragons],
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <ul>
      {
                dragons.map((dragon) => <DragonContent key={dragon.id} dragon={dragon} />)
              }
    </ul>
  );
};

export default Dragons;
