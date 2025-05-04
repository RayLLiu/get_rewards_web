import { useState, useEffect } from 'react';
import { Star, Activity, ChevronLeft, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApi } from './api';
import PageHeader from '../legoPiece/PageHeader';

export default function AllActivities() {
  const navigate = useNavigate();
  const api = useApi();

  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userResponse, activitiesResponse] = await Promise.all([
          api.get('/users/details'),
          api.get('/earned_points/list')
        ]);
        
        setUserData(userResponse);

        setActivities(activitiesResponse.earned_points);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold">Loading activities...</div>
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
        title="All Activities"
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
        <Activity size={20} className="mr-2 text-indigo-600" />
          Recent Activities
        </h2>
      </div>
      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md p-6">
            <div className="space-y-4">
              {activities.map(activity => (
                <div key={activity.id} className="flex justify-between items-center border-b pb-3">
                  <div>
                    <h3 className="font-medium">{activity.merchant}</h3>
                    <p className="text-sm text-gray-500">{activity.date}</p>
                  </div>
                  <div className="flex items-center text-green-600">
                    <span className="font-bold">+{activity.point}</span>
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
          <p className="text-gray-400">© 2025 activitiesPlus. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
} 