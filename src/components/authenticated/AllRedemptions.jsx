import { useState, useEffect } from 'react';
import { Star, Gift, ChevronLeft, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApi } from './api';
import PageHeader from '../legoPiece/PageHeader';

export default function AllRedemptions() {
  const navigate = useNavigate();
  const api = useApi();

  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [redemptions, setRedemptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {

        
        const [userResponse, redemptionsResponse] = await Promise.all([
          api.get('/users/details'),
          api.get('/redemptions/list')
        ]);
        
        setUserData(userResponse);
        setRedemptions(redemptionsResponse.redemptions);
      } catch (err) {
        setError(err.message);
        // Use sample data for demonstration purposes
        setUserData({
          name: "Jane Doe",
          email: "jane.doe@example.com",
          points: 2750
        });
        setRedemptions([
          { id: 1, name: "10% Discount Coupon", price: 500, category: "Discount" },
          { id: 2, name: "Free Shipping", price: 800, category: "Shipping" },
          { id: 3, name: "Gift Card $25", price: 2500, category: "Gift Card" },
          { id: 4, name: "Premium Item", price: 3000, category: "Product" },
          { id: 5, name: "20% Off Next Purchase", price: 1000, category: "Discount" },
          { id: 6, name: "Free Product", price: 1500, category: "Product" },
          { id: 7, name: "VIP Access", price: 5000, category: "Membership" },
          { id: 8, name: "Birthday redemption", price: 200, category: "Special" }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold">Loading redemptions...</div>
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
        title="All redemptions"
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
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold flex items-center">
          <Gift size={20} className="mr-2 text-indigo-600" />
          Redeem Histories
        </h2>
      </div>
      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md p-6">
            <div className="space-y-4">
              {redemptions.map(redeem => (
                <div key={redeem.id} className="flex justify-between items-center border-b pb-3">
                  <div>
                    <h3 className="font-medium">{redeem.name}</h3>
                    <p className="text-sm text-gray-500">{redeem.date}</p>
                  </div>
                  <div className="flex items-center text-red-600">
                    <span className="font-bold">-{redeem.price}</span>
                    <Star size={16} className="ml-1" />
                  </div>
                </div>
              ))}
            </div>
      </div>
    </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-8 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">© 2025 redemptionsPlus. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
} 