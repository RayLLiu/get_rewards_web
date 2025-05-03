import { useState, useEffect } from 'react';
import { Star, Gift, ChevronLeft, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApi } from './api';


export default function AllRewards() {
  const navigate = useNavigate();
  const api = useApi();

  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [availableRewards, setAvailableRewards] = useState([]);
  const [filter, setFilter] = useState('all');

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

  const handleRedeem = async (reward_id) => {
    try {
      await api.post(`/redeem/purchase`, {reward_id: reward_id});
      window.location.reload(); 
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {

        
        const [userResponse, rewardsResponse] = await Promise.all([
          api.get('/user/details'),
          api.get('/reward/list')
        ]);
        
        setUserData(userResponse);
        setAvailableRewards(rewardsResponse);
      } catch (err) {
        setError(err.message);
        // Use sample data for demonstration purposes
        setUserData({
          name: "Jane Doe",
          email: "jane.doe@example.com",
          points: 2750
        });
        setAvailableRewards([
          { id: 1, name: "10% Discount Coupon", points: 500, category: "Discount" },
          { id: 2, name: "Free Shipping", points: 800, category: "Shipping" },
          { id: 3, name: "Gift Card $25", points: 2500, category: "Gift Card" },
          { id: 4, name: "Premium Item", points: 3000, category: "Product" },
          { id: 5, name: "20% Off Next Purchase", points: 1000, category: "Discount" },
          { id: 6, name: "Free Product", points: 1500, category: "Product" },
          { id: 7, name: "VIP Access", points: 5000, category: "Membership" },
          { id: 8, name: "Birthday Reward", points: 200, category: "Special" }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredRewards = filter === 'all' 
    ? availableRewards.rewards
    : availableRewards.rewards.filter(reward => reward.category === filter);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold">Loading rewards...</div>
      </div>
    );
  }

  if (error && !userData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-xl">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-indigo-600 text-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center hover:text-indigo-200 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <h1 className="text-2xl font-bold">All Rewards</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <User size={20} />
              <span className="ml-2">{userData.name}</span>
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

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Points Balance */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Star className="text-yellow-500" size={24} />
              <span className="text-2xl font-bold ml-2">{userData.points}</span>
              <span className="ml-2 text-gray-600">points available</span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-md ${
                  filter === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('Discount')}
                className={`px-4 py-2 rounded-md ${
                  filter === 'Discount' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                Discounts
              </button>
              <button
                onClick={() => setFilter('Product')}
                className={`px-4 py-2 rounded-md ${
                  filter === 'Product' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                Products
              </button>
              <button
                onClick={() => setFilter('Gift Card')}
                className={`px-4 py-2 rounded-md ${
                  filter === 'Gift Card' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                Gift Cards
              </button>
            </div>
          </div>
        </div>

        {/* Rewards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRewards.map(reward => (
            <div key={reward.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <Gift size={24} className="text-indigo-600 mr-2" />
                <h3 className="text-xl font-bold">{reward.name}</h3>
              </div>
              <p className="text-gray-600 mb-4">{reward.category}</p>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Star size={16} className="text-yellow-500 mr-1" />
                  <span className="font-bold">{reward.points_required} points</span>
                </div>
                
                  <button 
                    onClick={() => handleRedeem(reward.id)}
                    className={`px-4 py-2 rounded-md ${
                      userData.points >= reward.points_required 
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Redeem
                  </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-8 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">© 2025 RewardsPlus. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
} 