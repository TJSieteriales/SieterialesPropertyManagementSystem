import { Link } from 'react-router-dom';

export default function FloatingButton() {
  return (
    <Link 
      to="/rooms/add" 
      className="fixed bottom-8 right-8 bg-blue-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl text-3xl hover:bg-blue-700 transition"
      title="Add Room"
    >
      +
    </Link>
  );
}