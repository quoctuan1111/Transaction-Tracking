import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import "./AddressDetail.css";

const AddressDetail = ({ theme }) => {
  // Sample data for the transaction count chart
  const transactionData = [
    { month: 'Oct', received: 1, sent: 0 },
    { month: 'Nov', received: 0, sent: 1 },
    { month: 'Feb', received: 1, sent: 0 },
    { month: 'Apr', received: 0, sent: 1 },
    { month: 'Oct', received: 0, sent: 1 },
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-header">
            <h2>Balance <span className="eye-icon">👁</span></h2>
            <div className="balance-value">
              0.00001 <span className="currency">BTC</span>
            </div>
            <div className="balance-change">
              -1.2%
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <h2>Address <span className="currency-label">Bitcoin</span></h2>
            <div className="address-value">
              0xc7317c5c4291e51e500d907ead70b713dc739a <span className="copy-icon">📄</span>
            </div>
            <div className="address-dates">
              <div>
                <span className="date-label">First Active:</span>
                <span className="date-value">1/1/2025</span>
              </div>
              <div>
                <span className="date-label">Last Active:</span>
                <span className="date-value">1/3/2025</span>
              </div>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <h2>Transaction Volume</h2>
            <div className="volume-stats">
              <div className="volume-stat">
                <div className="stat-number">3</div>
                <div className="stat-label">Sent</div>
              </div>
              <div className="volume-stat">
                <div className="stat-number">2</div>
                <div className="stat-label">Receive</div>
              </div>
              <div className="volume-stat">
                <div className="stat-number">5</div>
                <div className="stat-label">Total</div>
              </div>
            </div>
            <div className="volume-details">
              <div className="volume-detail">
                <span>Sent</span>
                <span>0.0001 BTC</span>
                <span>-1.2%</span>
              </div>
              <div className="volume-detail">
                <span>Received</span>
                <span>0.0004 BTC</span>
                <span>-1.5%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="transaction-chart">
        <h2>Transaction Count</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={transactionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="month" stroke={theme === 'dark' ? '#fff' : '#000'} />
            <YAxis stroke={theme === 'dark' ? '#fff' : '#000'} />
            <Bar dataKey="received" fill="#2ecc71" />
            <Bar dataKey="sent" fill="#e74c3c" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AddressDetail;