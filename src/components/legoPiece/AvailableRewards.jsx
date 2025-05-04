import { Gift, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useApi } from '../authenticated/api';
import React from 'react';
import PropTypes from 'prop-types';

export default function AvailableRewards({ availableRewards, pointsBalance }) {
  const navigate = useNavigate();
  const api = useApi();
  const setError = useState(null);
  const handleBrowseAllClick = () => {
    navigate('/all_rewards');
  };
  const handleRedeem = async (reward_id) => {
    try {
      await api.post(`/redemptions/purchase`, {reward_id: reward_id});
      window.location.reload(); 
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold flex items-center">
          <Gift size={20} className="mr-2 text-indigo-600" />
          Available Rewards
        </h2>
        <button className="text-indigo-600 text-sm flex items-center" onClick={handleBrowseAllClick}>
          Browse All <ChevronRight size={16} />
        </button>
      </div>
      
      <div className="space-y-4">
        {availableRewards.map(reward => (
          <div key={reward.id} className="flex justify-between items-center border-b pb-3">
            <div>
              <h3 className="font-medium">{reward.name}</h3>
              <p className="text-sm text-gray-500">{reward.category}</p>
            </div>
            <button
              onClick={() => handleRedeem(reward.id)}
              className={`px-4 py-2 rounded-md ${
                pointsBalance >= reward.points_required 
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              {reward.points_required} points
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

AvailableRewards.propTypes = {
  availableRewards: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    points_required: PropTypes.number.isRequired
  })).isRequired,
  pointsBalance: PropTypes.number.isRequired
}; 