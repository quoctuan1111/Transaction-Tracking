import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import "./AddressDetail.css";
import TransactionGraph from './TransactionGraph';
import TopInteractions from './TopInteraction';
import { getFullAddressData } from './MockData';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                <p className="tooltip-label">{label}</p>
                {payload.map((entry, index) => (
                    <p key={index} className="tooltip-value" style={{ color: entry.color }}>
                        {entry.name}: {entry.value}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

const AddressDetail = ({ theme }) => {
    const { address } = useParams();
    const [addressData, setAddressData] = useState(null);

    useEffect(() => {
        // Load full address data when component mounts or address changes
        setAddressData(getFullAddressData(address, 'ETHEREUM')); // You can make currency dynamic if needed
    }, [address]);

    if (!addressData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="dashboard-container">
            {/* Balance Card */}
            <div className="dashboard-stats">
                <div className="stat-card">
                    <div className="stat-header">
                        <h2>Balance <span className="eye-icon">👁</span></h2>
                        <div className="balance-value">
                            {addressData.balance} <span className="currency">{addressData.currency}</span>
                        </div>
                        <div className="balance-change">
                            {addressData.changePercentage}%
                        </div>
                    </div>
                </div>

                {/* Address Card */}
                <div className="stat-card">
                    <div className="stat-header">
                        <h2>Address <span className="currency-label">{addressData.currency}</span></h2>
                        <div className="address-value">
                            {address} <span className="copy-icon" onClick={() => navigator.clipboard.writeText(address)}>📄</span>
                        </div>
                        <div className="address-dates">
                            <div>
                                <span className="date-label">First Active:</span>
                                <span className="date-value">{addressData.firstActive}</span>
                            </div>
                            <div>
                                <span className="date-label">Last Active:</span>
                                <span className="date-value">{addressData.lastActive}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Transaction Volume Card */}
                <div className="stat-card">
                    <div className="stat-header">
                        <h2>Transaction Volume</h2>
                        <div className="volume-stats">
                            <div className="volume-stat">
                                <div className="stat-number">{addressData.sentCount}</div>
                                <div className="stat-label">Sent</div>
                            </div>
                            <div className="volume-stat">
                                <div className="stat-number">{addressData.receivedCount}</div>
                                <div className="stat-label">Received</div>
                            </div>
                            <div className="volume-stat">
                                <div className="stat-number">{addressData.totalCount}</div>
                                <div className="stat-label">Total</div>
                            </div>
                        </div>
                        <div className="volume-details">
                            <div className="volume-detail">
                                <span>Sent</span>
                                <span>{addressData.sentAmount} {addressData.currency}</span>
                                <span>{addressData.changePercentage}%</span>
                            </div>
                            <div className="volume-detail">
                                <span>Received</span>
                                <span>{addressData.receivedAmount} {addressData.currency}</span>
                                <span>{addressData.changePercentage}%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            
            <TransactionGraph theme={theme} address={address} data={addressData.transactionGraph} />

            
            

            {/* Transaction Chart */}
            <div className="transaction-chart">
                <h2>Transaction Count</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={addressData.transactionHistory} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <XAxis dataKey="month" stroke={theme === 'dark' ? '#fff' : '#000'} />
                        <YAxis stroke={theme === 'dark' ? '#fff' : '#000'} />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }} />
                        <Bar dataKey="received" fill="#2ecc71" />
                        <Bar dataKey="sent" fill="#e74c3c" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <TopInteractions interactions={addressData.interactions} />

            {/* Transactions Section */}
            <div className="transactions-section">
                <h2>Transactions</h2>
                <div className="transactions-table">
                    {addressData.transactions.map((tx, index) => (
                        <div key={index} className="transaction-row">
                            <div className="tx-addresses">
                                <div className="address-pair">
                                    <span className="label">From:</span>
                                    <span className="address_trans">{tx.from}</span>
                                </div>
                                <div className="address-pair">
                                    <span className="label">To:</span>
                                    <span className="address_trans">{tx.to}</span>
                                </div>
                            </div>
                            <div className="tx-amount">
                                <div>{tx.value} {addressData.currency}</div>
                                <div className="usd-value">≈ ${(tx.value * 2000).toFixed(2)} USD</div>
                            </div>
                            <div className="tx-time">{tx.timestamp}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AddressDetail;