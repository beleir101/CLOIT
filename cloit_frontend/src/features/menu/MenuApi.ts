import axios from 'axios';

const API_URL = 'http://localhost:3000/';

export const fetchMenus = async () => {
  return await axios.get(API_URL);
};

export const addMenu = async (menuData:string) => {
  return await axios.post(API_URL, menuData);
};

export const updateMenu = async (id:string, menuData:string) => {
  return await axios.put(`${API_URL}/${id}`, menuData);
};

export const deleteMenu = async (id:string) => {
  return await axios.delete(`${API_URL}/${id}`);
};