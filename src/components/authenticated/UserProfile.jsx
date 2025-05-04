import { useState, useEffect } from 'react';
import { Star, Gift, Activity, Award, ChevronRight, Bell, Settings, User, LogOut, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApi } from './api';
import AvailableRewards from '../legoPiece/AvailableRewards';
import RedeemHistory from '../legoPiece/RedeemHistory';
import PageHeader from '../legoPiece/PageHeader';

export default function UserProfile() {
  const navigate = useNavigate();
  const api = useApi();
  const [tierStatus, setTierStatus] = useState("Silver");
  const [availableRewards, setAvailableRewards] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [recentActivities, setPointData] = useState(null);
  
  const [redeemHistory, setRedeemHistory] = useState(null);

  const handleBrowseAllClick = () => {
    navigate('/all_activities');
  };

  useEffect(() => {
    // Fetch user data from API
    const fetchUserData = async () => {
      try {
        // Replace with your actual API endpoint
        const data = await api.get('/users/details');
        
        setUserData(data);
        setPointData(data.earned_points)
        setTierStatus(data.tier)
        setAvailableRewards(data.rewards)
        setRedeemHistory(data.redemption_history)
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold">Loading user profile...</div>
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
        title="GetRewards"
        userName={userData.name}
        onBack={() => navigate(-1)}
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Points Summary Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <h2 className="text-lg text-gray-500 mb-1">Total Accumulated Points</h2>
              <div className="flex items-center">
                <Clock className="text-yellow-500" size={24} />
                <span className="text-3xl font-bold ml-2">{userData.points_accumulated}</span>
              </div>
            </div>

            <div>
              <h2 className="text-lg text-gray-500 mb-1">Available Points</h2>
              <div className="flex items-center">
                <Star className="text-yellow-500" size={24} />
                <span className="text-3xl font-bold ml-2">{userData.points_balance}</span>
              </div>
            </div>
            
            <div>
              <h2 className="text-lg text-gray-500 mb-1">Current Tier</h2>
              <div className="flex items-center">
                <Award className="text-yellow-500" size={24} />
                <span className="text-2xl font-bold ml-2">{tierStatus}</span>
              </div>
            </div>
            
            <div>
              <h2 className="text-lg text-gray-500 mb-1">Next Tier</h2>
              <div className="mb-1">
                <span>{userData.point_to_next_tier} points to {userData.next_tier}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-indigo-600 h-2.5 rounded-full" 
                  style={{ width: `${(userData.points_accumulated / (userData.points_accumulated + userData.point_to_next_tier)) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold flex items-center">
                <Activity size={20} className="mr-2 text-indigo-600" />
                Recent Activity
              </h2>
              <button onClick={handleBrowseAllClick} className="text-indigo-600 text-sm flex items-center">
                View All <ChevronRight size={16} />
              </button>
            </div>
            
            <div className="space-y-4">
              {recentActivities.map(activity => (
                <div key={activity.id} className="flex justify-between items-center border-b pb-3">
                  <div>
                    <h3 className="font-medium">{activity.merchant}</h3>
                    <p className="text-sm text-gray-500">{activity.date}</p>
                  </div>
                  <div className="flex items-center text-green-600">
                    <span className="font-bold">+{parseInt(activity.amount)}</span>
                    <Star size={16} className="ml-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Available Rewards */}
          <AvailableRewards 
            availableRewards={availableRewards}
            pointsBalance={userData.points_balance}
          />
        </div>

        <div className="">
            {/* Available Rewards */}
            <RedeemHistory 
              redeemHistory={redeemHistory}
            />
          </div>

        {/* Featured Rewards Banner */}
        <div className="mt-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-md p-6 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">Limited Time Offer</h2>
              <p className="mb-4">Double points on all purchases this weekend!</p>
              <button className="bg-white text-indigo-600 px-6 py-2 rounded-md font-medium hover:bg-gray-100">
                Learn More
              </button>
            </div>
            <div className="hidden md:block">
              <Star size={64} />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-8 py-6">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <h3 className="text-lg font-bold mb-3">GetRewards</h3>
              <p className="text-gray-400">Earn rewards on every purchase and engagement with our platform.</p>
            </div>
            <div>
              <h3 className="font-bold mb-3">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li>How It Works</li>
                <li>Redeem Points</li>
                <li>View Transactions</li>
                <li>FAQs</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-3">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Support</li>
                <li>Help Center</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-3">Subscribe</h3>
              <p className="text-gray-400 mb-2">Get updates on special offers</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-3 py-2 rounded-l-md text-gray-800 w-full"
                />
                <button className="bg-indigo-600 px-4 py-2 rounded-r-md">
                  Go
                </button>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-700 text-center text-gray-400">
            <p>© 2025 GetRewards. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}