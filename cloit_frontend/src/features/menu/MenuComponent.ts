import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMenus } from './MenuSlice';
import { AppDispatch } from '@/store/store';
/*
const MenuComponent = () => {
    const dispatch = useDispatch<AppDispatch>();
  const { menus, status } = useSelector((state) => state.menu);

  useEffect(() => {
    dispatch(getMenus());
  }, [dispatch]);

  return (
    <div>
      {status === 'loading' && <p>Loading...</p>}
      {menus.map((menu) => (
        <div key={menu.id}>
          <h3>{menu.name}</h3>
          
        </div>
      ))}
    </div>
  );
};

export default MenuComponent;*/