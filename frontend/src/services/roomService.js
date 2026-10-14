import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

export const getRooms = async () => {
  const response = await axios.get(`${API_URL}/rooms`);
  return response.data.rooms || response.data;
};

export const getRoomById = async (id) => {
  const response = await axios.get(`${API_URL}/rooms/${id}`);
  return response.data.room || response.data;
};

export const createRoom = async (roomData) => {
  const response = await axios.post(`${API_URL}/rooms`, roomData);
  return response.data;
};