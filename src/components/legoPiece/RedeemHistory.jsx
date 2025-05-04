import { Gift, ChevronRight, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function RedeemHistory({ redeemHistory }) {
  const navigate = useNavigate();
  const handleBrowseAllClick = () => {
    navigate('/all_redemptions');
  };
  return (
    <div className="mt-8 bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold flex items-center">
          <Gift size={20} className="mr-2 text-indigo-600" />
          Redeem Histories
        </h2>
        <button className="text-indigo-600 text-sm flex items-center" onClick={handleBrowseAllClick}>
          Browse All <ChevronRight size={16} />
        </button>
      </div>
      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md p-6">
            <div className="space-y-4">
              {redeemHistory.map(redeem => (
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
  );
} 