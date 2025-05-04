import { useState, useEffect } from 'react';
import { Star, Gift, ChevronLeft, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApi } from './api';
import PageHeader from '../legoPiece/PageHeader';


export default function AllRewards() {
  const navigate = useNavigate();
  const api = useApi();

  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [availableRewards, setAvailableRewards] = useState([]);
  const [filter, setFilter] = useState('all');

  const handleRedeem = async (reward_id) => {
    try {
      await api.post(`/redemptions/purchase`, {reward_id: reward_id});
      window.location.reload(); 
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {

        
        const [userResponse, rewardsResponse] = await Promise.all([
          api.get('/users/details'),
          api.get('/rewards/list')
        ]);
        
        setUserData(userResponse);
        setAvailableRewards(rewardsResponse);
      } catch (err) {
        setError(err.message);
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
      <PageHeader 
        title="All Rewards"
        userName={userData.name}
        onBack={() => navigate(-1)}
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Points Balance */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Star className="text-yellow-500" size={24} />
              <span className="text-2xl font-bold ml-2">{userData.points_balance}</span>
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
                onClick={() => setFilter('Discounts')}
                className={`px-4 py-2 rounded-md ${
                  filter === 'Discounts' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                Discounts
              </button>
              <button
                onClick={() => setFilter('Products')}
                className={`px-4 py-2 rounded-md ${
                  filter === 'Products' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                Products
              </button>
              <button
                onClick={() => setFilter('Gift Cards')}
                className={`px-4 py-2 rounded-md ${
                  filter === 'Gift Cards' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'
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
                      userData.points_balance >= reward.points_required 
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
          <p className="text-gray-400">© 2025 GetRewards. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
} 