import { useState } from 'react';

export default function Reward() {
  // User's available points
  const [userPoints, setUserPoints] = useState(1000);
  
  // Available rewards
  const [rewards, setRewards] = useState([
    { id: 1, name: "Coffee Mug", points: 150, image: "/api/placeholder/100/100", selected: false },
    { id: 2, name: "T-Shirt", points: 250, image: "/api/placeholder/100/100", selected: false },
    { id: 3, name: "Bluetooth Speaker", points: 500, image: "/api/placeholder/100/100", selected: false },
    { id: 4, name: "Wireless Earbuds", points: 800, image: "/api/placeholder/100/100", selected: false },
    { id: 5, name: "Smart Watch", points: 1200, image: "/api/placeholder/100/100", selected: false },
  ]);

  // Cart items
  const [cart, setCart] = useState([]);
  
  // Notification message
  const [notification, setNotification] = useState("");
  
  // Total points in cart
  const cartTotal = cart.reduce((sum, item) => sum + item.points, 0);
  
  // Toggle selection of a reward
  const toggleSelect = (id) => {
    const updatedRewards = rewards.map(reward => 
      reward.id === id ? { ...reward, selected: !reward.selected } : reward
    );
    
    setRewards(updatedRewards);
    
    // Update cart
    const selectedReward = updatedRewards.find(r => r.id === id);
    if (selectedReward.selected) {
      setCart([...cart, selectedReward]);
    } else {
      setCart(cart.filter(item => item.id !== id));
    }
  };
  
  // Purchase selected rewards
  const purchaseRewards = () => {
    if (cart.length === 0) {
      setNotification("Please select at least one reward");
      setTimeout(() => setNotification(""), 3000);
      return;
    }
    
    if (cartTotal > userPoints) {
      setNotification("Not enough points for purchase");
      setTimeout(() => setNotification(""), 3000);
      return;
    }
    
    // Process purchase
    setUserPoints(userPoints - cartTotal);
    
    // Reset selections
    setRewards(rewards.map(reward => ({ ...reward, selected: false })));
    setCart([]);
    
    setNotification("Purchase successful!");
    setTimeout(() => setNotification(""), 3000);
  };
  
  // Remove item from cart
  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
    setRewards(rewards.map(reward => 
      reward.id === id ? { ...reward, selected: false } : reward
    ));
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-2">Rewards Redemption</h1>
        <div className="flex justify-between items-center">
          <p className="text-xl">Your Points: <span className="font-bold text-green-600">{userPoints}</span></p>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Your Cart: {cart.length} items</h2>
            <p className="text-lg">Total: <span className="font-bold text-blue-600">{cartTotal} points</span></p>
            <button 
              className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              onClick={purchaseRewards}
            >
              Purchase Rewards
            </button>
          </div>
        </div>
      </header>
      
      {notification && (
        <div className={`p-4 mb-6 rounded-md ${notification.includes("successful") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {notification}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rewards.map(reward => (
          <div key={reward.id} className={`bg-white p-6 rounded-lg shadow-md border-2 ${reward.selected ? "border-blue-500" : "border-transparent"}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">{reward.name}</h3>
              <span className="font-bold text-blue-600">{reward.points} points</span>
            </div>
            <div className="flex justify-center mb-4">
              <img src={reward.image} alt={reward.name} className="w-32 h-32 object-cover rounded" />
            </div>
            <button 
              className={`w-full py-2 px-4 rounded-md ${
                reward.selected
                  ? "bg-red-500 hover:bg-red-600 text-white"
                  : userPoints < reward.points
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
              onClick={() => toggleSelect(reward.id)}
              disabled={!reward.selected && userPoints < reward.points}
            >
              {reward.selected ? "Remove" : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>
      
      {cart.length > 0 && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Your Selection</h2>
          <div className="space-y-4">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                <div className="flex items-center">
                  <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded mr-4" />
                  <span>{item.name}</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-4 text-blue-600 font-semibold">{item.points} points</span>
                  <button 
                    className="text-red-500 hover:text-red-700"
                    onClick={() => removeFromCart(item.id)}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
            <div className="flex justify-between pt-4 border-t border-gray-200">
              <span className="text-lg font-bold">Total</span>
              <span className="text-lg font-bold text-blue-600">{cartTotal} points</span>
            </div>
            <button 
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition mt-4"
              onClick={purchaseRewards}
            >
              Purchase ({cartTotal} points)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}