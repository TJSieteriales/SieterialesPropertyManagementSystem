import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRoomById } from '../services/roomService';

export default function RoomDetails() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadDetails();
  }, [id]);

  const loadDetails = async () => {
    try {
      const data = await getRoomById(id);
      setRoom(data);
    } catch (err) {
      setError('Failed to fetch room details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Room Details</h2>
        {loading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {room && (
          <div className="space-y-4 mb-6 text-gray-700">
            <div><span className="font-bold">ID:</span> {room.id}</div>
            <div><span className="font-bold">Room Number:</span> {room.room_number}</div>
            <div><span className="font-bold">Room Type:</span> {room.room_type}</div>
            <div><span className="font-bold">Nightly Rate:</span> ${room.nightly_rate}</div>
            <div><span className="font-bold">Created At:</span> {new Date(room.created_at).toLocaleString()}</div>
          </div>
        )}
        <button onClick={() => navigate('/rooms')} className="w-full bg-gray-600 text-white py-2 rounded font-bold hover:bg-gray-700 transition">
          Back to List
        </button>
      </div>
    </div>
  );
}