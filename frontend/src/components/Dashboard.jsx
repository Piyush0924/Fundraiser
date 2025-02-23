import { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [campaignData, setCampaignData] = useState({
    goalAchieved: 0,
    totalGoal: 30000,
    level: 'Star',
    referenceCode: 'pra7432'
  });

  useEffect(() => {
    const fetchCampaignData = async () => {
      try {
        const response = await axios.get('/api/campaign');
        setCampaignData(response.data);
      } catch (error) {
        console.error('Error fetching campaign data:', error);
      }
    };
    fetchCampaignData();
  }, []);

  return (
    <div className="p-6">
      {/* Landing Image */}
      <div className="w-full h-64 bg-cover bg-center rounded-lg shadow-lg mb-8" 
        style={{ backgroundImage: "url('/images.jpg')" }}>
        <div className="h-full flex items-center justify-center bg-black bg-opacity-40 rounded-lg">
          <h1 className="text-white text-4xl font-bold">Welcome to Your Campaign</h1>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-lg shadow">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-500 mb-2">Goal Achieved</div>
            <div className="text-4xl font-bold">{campaignData.goalAchieved}</div>
            <div className="mt-4">
              <div className="text-gray-600">Total Goal</div>
              <div className="text-2xl font-semibold">₹{campaignData.totalGoal}</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>Level Achieved: {campaignData.level}</div>
              <div className="flex gap-2">
                <button className="bg-red-500 text-white px-4 py-2 rounded">Rewards</button>
                <button className="bg-red-500 text-white px-4 py-2 rounded">Copy Donation Link</button>
              </div>
            </div>
            <div className="text-gray-600">Unlock Ninja Level at 5000</div>
            <div className="text-gray-600">Time Left: Campaign Expired</div>
            <div className="mt-4">Reference Code: {campaignData.referenceCode}</div>
            <button className="w-full bg-gradient-to-r from-red-500 to-purple-500 text-white py-2 rounded">
              Share On Whatsapp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
