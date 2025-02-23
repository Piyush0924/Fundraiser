// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import TransactionsTable from './components/TransactionsTable';
import DonationForm from './components/DonationForm';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const [showDonationForm, setShowDonationForm] = useState(false);

  return (
    <Router>
      
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <div className="p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/transactions" element={<TransactionsTable />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
            <button
              onClick={() => setShowDonationForm(true)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
            >
              Make a Donation
            </button>
          </div>
        </div>
      </div>
      {showDonationForm && (
        <DonationForm onClose={() => setShowDonationForm(false)} />
      )}
    </Router>
  );
}

export default App;
