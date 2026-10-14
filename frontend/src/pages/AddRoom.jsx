import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createRoom } from '../services/roomService';

export default function AddRoom() {
  const [roomNumber, setRoomNumber] = useState('');
  const [roomType, setRoomType] = useState('Standard Single');
  const [nightlyRate, setNightlyRate] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createRoom({ room_number: roomNumber, room_type: roomType, nightly_rate: nightlyRate });
      navigate('/rooms');
    } catch (err) {
      setError('Failed to save room. Check inputs or room number uniqueness.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Room</h2>
        {error && <div className="mb-4 text-sm text-red-600 bg-red-50 p-2 rounded">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Room Number</label>
            <input 
              type="text" 
              value={roomNumber} 
              onChange={(e) => setRoomNumber(e.target.value)} 
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300" 
              required 
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Room Type</label>
            <select 
              value={roomType} 
              onChange={(e) => setRoomType(e.target.value)} 
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="Standard Single">Standard Single</option>
              <option value="Deluxe Double">Deluxe Double</option>
              <option value="Executive Suite">Executive Suite</option>
              <option value="Penthouse">Penthouse</option>
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Nightly Rate ($)</label>
            <input 
              type="number" 
              step="0.01" 
              value={nightlyRate} 
              onChange={(e) => setNightlyRate(e.target.value)} 
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300" 
              required 
            />
          </div>
          <div className="flex gap-4">
            <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700 transition">Save</button>
            <button type="button" onClick={() => navigate('/rooms')} className="flex-1 bg-gray-400 text-white py-2 rounded font-bold hover:bg-gray-500 transition">Back</button>
          </div>
        </form>
      </div>
    </div>
  );
}