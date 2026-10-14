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

  // Restore session on mount
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const savedUser = localStorage.getItem('user');
    if (isAuthenticated && savedUser) {
      setUser(JSON.parse(savedUser));
      fetchRooms();
    }
  }, []);

  const fetchRooms = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/rooms');
      setRooms(res.data.rooms || res.data);
    } catch (err) {
      setError('Failed to fetch rooms from the server. Ensure backend is running.');
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
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 style={{ fontSize: '1.25rem', fontWeight: '800', margin: 0, color: '#0f172a' }}>
          Hotel Room Inventory
        </h1>
        <button onClick={handleLogout} className="danger-button">
          Logout
        </button>
      </header>

      {error && <div className="alert-error">{error}</div>}

      {view === 'list' && (
        <div className="content-card">
          {loading && <p className="muted">Loading rooms...</p>}
          
          {!loading && rooms.length === 0 && (
            <p className="muted">No rooms found. Click the + button to add one.</p>
          )}

          <ul className="room-list">
            {rooms.map((room) => (
              <li key={room.id} className="room-item">
                <div>
                  <button 
                    onClick={() => handleViewDetails(room.id)}
                    className="room-link"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                  >
                    Room: {room.room_number}
                  </button>
                  <span className="room-badge">{room.room_type}</span>
                </div>
                <span className="room-price">${room.nightly_rate} / night</span>
              </li>
            ))}
          </ul>

          <button 
            onClick={() => setView('add')} 
            className="fab"
            title="Add Room"
          >
            +
          </button>
        </div>
      )}

      {view === 'add' && (
        <div className="content-card" style={{ maxWidth: '500px', margin: '0 auto' }}>
          <h2 style={{ marginTop: 0, fontSize: '1.5rem', fontWeight: '800', marginBottom: '1.5rem' }}>Add New Room</h2>
          <form onSubmit={handleAddRoom}>
            <label>
              Room Number
              <input 
                type="text" 
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                placeholder="e.g. 101"
                required
              />
            </label>

            <label>
              Room Type / Category
              <select 
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
              >
                <option value="Standard Single">Standard Single</option>
                <option value="Deluxe Double">Deluxe Double</option>
                <option value="Executive Suite">Executive Suite</option>
                <option value="Penthouse">Penthouse</option>
              </select>
            </label>

            <label>
              Nightly Rate ($)
              <input 
                type="number" 
                step="0.01"
                value={nightlyRate}
                onChange={(e) => setNightlyRate(e.target.value)}
                placeholder="150.00"
                required
              />
            </label>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <button type="submit" className="primary-button full-width">
                Save Room
              </button>
              <button type="button" onClick={() => setView('list')} className="secondary-button full-width">
                Back
              </button>
            </div>
          </form>
        </div>
      )}

      {view === 'details' && selectedRoom && (
        <div className="content-card" style={{ maxWidth: '500px', margin: '0 auto' }}>
          <h2 style={{ marginTop: 0, fontSize: '1.5rem', fontWeight: '800', marginBottom: '1.5rem' }}>Room Details</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem', color: '#334155' }}>
            <div><strong>Room ID:</strong> {selectedRoom.id}</div>
            <div><strong>Room Number:</strong> {selectedRoom.room_number}</div>
            <div><strong>Room Type:</strong> {selectedRoom.room_type}</div>
            <div><strong>Nightly Rate:</strong> ${selectedRoom.nightly_rate}</div>
            <div><strong>Created At:</strong> {new Date(selectedRoom.created_at).toLocaleString()}</div>
          </div>
          <button onClick={() => setView('list')} className="secondary-button full-width">
            Back to List
          </button>
        </div>
      )}
    </div>
  );
}