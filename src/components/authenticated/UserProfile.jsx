import { useState, useEffect } from 'react';
import { User, Clock, ShoppingBag, Award } from 'lucide-react';
import './UserProfile.css';

import { useApi } from './api';

// Main component
export default function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const api = useApi();

  useEffect(() => {
    // Fetch user data from API
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        // Replace with your actual API endpoint
        const data = await api.get('/user/details');

        setUserData(data);
      } catch (err) {
        setError(err.message);
        // Use sample data for demonstration purposes
        setUserData({
          name: "Jane Doe",
          email: "jane.doe@example.com",
          points: 2750,
          avatar: "/api/placeholder/200/200",
          point_history: [
            { id: 1, date: "2025-04-28", item: "Premium Subscription", amount: 49.99 },
            { id: 2, date: "2025-04-15", item: "E-book Bundle", amount: 29.99 },
            { id: 3, date: "2025-03-22", item: "Online Course", amount: 199.00 },
            { id: 4, date: "2025-03-10", item: "Digital Download", amount: 12.99 }
          ],
          purchase_history: [
            { id: 1, date: "2025-04-28", item: "Premium Subscription", amount: "49.99" },
            { id: 2, date: "2025-04-15", item: "E-book Bundle", amount: "29.99" },
            { id: 3, date: "2025-03-22", item: "Online Course", amount: "199.00" },
            { id: 4, date: "2025-03-10", item: "Digital Download", amount: "12.99" }
          ]
        });
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
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">User Profile</h1>
        
        {/* User Info Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="w-32 h-32 rounded-full overflow-hidden">
              <img src={userData.avatar} alt="User avatar" className="w-full h-full object-cover" />
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-800">{userData.name}</h2>
              
              <div className="flex items-center justify-center md:justify-start mt-2">
                <User size={18} className="text-gray-500 mr-2" />
                <span className="text-gray-600">{userData.email}</span>
              </div>
              
              <div className="flex items-center justify-center md:justify-start mt-2">
                <Award size={18} className="text-purple-500 mr-2" />
                <span className="text-purple-700 font-semibold">{userData.points} Points</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Points Summary Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Award size={20} className="text-purple-500 mr-2" />
            Points Summary
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="text-sm text-purple-700 font-medium">Current Balance</h4>
              <p className="text-2xl font-bold text-purple-800">{userData.points}</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="text-sm text-green-700 font-medium">Points Earned</h4>
              <p className="text-2xl font-bold text-green-800">{userData.points_earned}</p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="text-sm text-blue-700 font-medium">Points Redeemed</h4>
              <p className="text-2xl font-bold text-blue-800">{userData.points_redeemed}</p>
            </div>
          </div>
        </div>
        
        {/* Purchase History */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <ShoppingBag size={20} className="text-gray-500 mr-2" />
            Purchase History
          </h3>
          
          {userData.point_history && userData.point_history.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 px-2 text-left text-sm font-medium text-gray-500">Date</th>
                    <th className="py-3 px-2 text-left text-sm font-medium text-gray-500">Item</th>
                    <th className="py-3 px-2 text-right text-sm font-medium text-gray-500">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.point_history.map((point_history) => (
                    <tr key={point_history.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-2 text-sm text-gray-600 flex items-center">
                        <Clock size={16} className="text-gray-400 mr-2" />
                        {point_history.date}
                      </td>
                      <td className="py-3 px-2 text-sm text-gray-800 font-medium">{point_history.item}</td>
                      <td className="py-3 px-2 text-sm text-gray-800 font-medium text-right">
                        ${point_history.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No purchase history available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}