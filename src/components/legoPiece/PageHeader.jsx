import { ChevronLeft, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PageHeader({ title, userName, onBack }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      localStorage.removeItem('authToken');
      navigate('/');
    } catch (err) {
      console.error('Logout failed:', err);
      localStorage.removeItem('authToken');
      navigate('/');
    }
  };

  return (
    <header className="bg-indigo-600 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button 
            onClick={onBack}
            className="flex items-center hover:text-indigo-200 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <User size={20} />
            <span className="ml-2">{userName}</span>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center hover:text-indigo-200 transition-colors"
          >
            <LogOut size={20} />
            <span className="ml-2">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
} 