import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getRooms } from '../services/roomService';
import FloatingButton from '../components/FloatingButton';

export default function RoomList() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    try {
      const data = await getRooms();
      setRooms(data);
    } catch (err) {
      setError('Failed to fetch rooms.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 relative">
      <div className="max-w-4xl mx-auto flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Hotel Room Inventory</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
          Logout
        </button>
      </div>

      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
        {loading && <p className="text-gray-500">Loading rooms...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && rooms.length === 0 && (
          <p className="text-gray-500">No rooms found.</p>
        )}

        <ul className="divide-y divide-gray-200">
          {rooms.map((room) => (
            <li key={room.id} className="py-3 flex justify-between items-center">
              <div>
                <Link to={`/rooms/${room.id}`} className="font-semibold text-lg text-blue-600 hover:underline">
                  Room: {room.room_number}
                </Link>
                <span className="ml-4 text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                  {room.room_type}
                </span>
              </div>
              <span className="text-green-600 font-bold">${room.nightly_rate} / night</span>
            </li>
          ))}
        </ul>
      </div>

      <FloatingButton />
    </div>
  );
}