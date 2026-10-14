import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import LoginPage from './pages/LoginPage';

export default function App() {
  const [user, setUser] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [view, setView] = useState('list');
  const [selectedRoom, setSelectedRoom] = useState(null);

  const [roomNumber, setRoomNumber] = useState('');
  const [roomType, setRoomType] = useState('Standard Single');
  const [nightlyRate, setNightlyRate] = useState('');

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      fetchRooms();
    }
  }, []);

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/rooms');
      setRooms(res.data.rooms || res.data);
    } catch (err) {
      setError('Failed to fetch rooms from the server.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddRoom = async (e) => {
    e.preventDefault();
    setError('');

    if (!roomNumber || !roomType || !nightlyRate) {
      setError('All fields are required.');
      return;
    }

    try {
      await axios.post('http://127.0.0.1:8000/api/rooms', {
        room_number: roomNumber,
        room_type: roomType,
        nightly_rate: nightlyRate,
      });
      setRoomNumber('');
      setNightlyRate('');
      setRoomType('Standard Single');
      setView('list');
      fetchRooms();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save room. Room number must be unique.');
    }
  };

  const handleViewDetails = async (id) => {
    setLoading(true);
    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/rooms/${id}`);
      setSelectedRoom(res.data.room || res.data);
      setView('details');
    } catch (err) {
      setError('Failed to fetch room details.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
  };

  if (!user) {
    return <LoginPage onLogin={(userData) => { setUser(userData); fetchRooms(); }} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 relative">
      <div className="max-w-4xl mx-auto flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Hotel Room Inventory</h1>
        <button 
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {error && <div className="max-w-4xl mx-auto mb-4 text-sm text-red-600 bg-red-50 p-3 rounded">{error}</div>}

      {view === 'list' && (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
          {loading && <p className="text-gray-500">Loading rooms...</p>}
          
          {!loading && rooms.length === 0 && (
            <p className="text-gray-500">No rooms found. Click the + button to add one.</p>
          )}

          <ul className="divide-y divide-gray-200">
            {rooms.map((room) => (
              <li key={room.id} className="py-3 flex justify-between items-center">
                <div>
                  <button 
                    onClick={() => handleViewDetails(room.id)}
                    className="font-semibold text-lg text-blue-600 hover:underline text-left"
                  >
                    Room: {room.room_number}
                  </button>
                  <span className="ml-4 text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                    {room.room_type}
                  </span>
                </div>
                <span className="text-green-600 font-bold">${room.nightly_rate} / night</span>
              </li>
            ))}
          </ul>

          <button 
            onClick={() => setView('add')} 
            className="fixed bottom-8 right-8 bg-blue-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl text-3xl hover:bg-blue-700 transition"
            title="Add Room"
          >
            +
          </button>
        </div>
      )}

      {view === 'add' && (
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Room</h2>
          <form onSubmit={handleAddRoom}>
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
              <label className="block text-gray-700 text-sm font-bold mb-2">Room Type / Category</label>
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
              <button 
                type="submit" 
                className="flex-1 bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700 transition"
              >
                Save Room
              </button>
              <button 
                type="button" 
                onClick={() => setView('list')}
                className="flex-1 bg-gray-400 text-white py-2 rounded font-bold hover:bg-gray-500 transition"
              >
                Back
              </button>
            </div>
          </form>
        </div>
      )}

      {view === 'details' && selectedRoom && (
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Room Details</h2>
          <div className="space-y-4 mb-6 text-gray-700">
            <div><span className="font-bold">Room ID:</span> {selectedRoom.id}</div>
            <div><span className="font-bold">Room Number:</span> {selectedRoom.room_number}</div>
            <div><span className="font-bold">Room Type:</span> {selectedRoom.room_type}</div>
            <div><span className="font-bold">Nightly Rate:</span> ${selectedRoom.nightly_rate}</div>
            <div><span className="font-bold">Created At:</span> {new Date(selectedRoom.created_at).toLocaleString()}</div>
          </div>
          <button 
            onClick={() => setView('list')}
            className="w-full bg-gray-600 text-white py-2 rounded font-bold hover:bg-gray-700 transition"
          >
            Back to List
          </button>
        </div>
      )}
    </div>
  );
}