import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import "./AddressDetail.css";
import TransactionGraph from './TransactionGraph';

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
    const { address } = useParams(); // Get address from URL
    const [addressData, setAddressData] = useState({
        balance: '0.00000',
        currency: 'BTC',
        changePercentage: '0',
        firstActive: 'N/A',
        lastActive: 'N/A',
        sentCount: 0,
        receivedCount: 0,
        totalCount: 0,
        sentAmount: '0.0000',
        receivedAmount: '0.0000'
    });

    // Mock transaction data - in a real app, this would come from an API
    const [transactions, setTransactions] = useState([]);
    const [transactionData, setTransactionData] = useState([]);

    useEffect(() => {
        // Here you would typically fetch data from your API
        // For demo purposes, we're using mock data
        const mockData = {
            balance: '0.00107',
            currency: getCurrencyFromAddress(address),
            changePercentage: '-1.2',
            firstActive: '2024-01-01',
            lastActive: '2024-02-13',
            sentCount: 3,
            receivedCount: 2,
            totalCount: 5,
            sentAmount: '0.0001',
            receivedAmount: '0.0004'
        };

        const mockTransactions = [
            {
                hash: `${address.substring(0, 8)}...${address.substring(address.length - 8)}`,
                from: address,
                to: '0x1ef75d...f487b02c',
                amount: '0.00107',
                usdValue: '≈ $2.31 USD',
                time: '10:45am 13/02/2024'
            },
            // Add more mock transactions as needed
        ];

        const mockTransactionData = [
            { month: 'Oct', received: 1, sent: 0 },
            { month: 'Nov', received: 0, sent: 1 },
            { month: 'Dec', received: 1, sent: 0 },
            { month: 'Jan', received: 0, sent: 1 },
            { month: 'Feb', received: 0, sent: 1 }
        ];

        setAddressData(mockData);
        setTransactions(mockTransactions);
        setTransactionData(mockTransactionData);
    }, [address]);

    // Helper function to determine currency based on address format
    const getCurrencyFromAddress = (addr) => {
        if (addr.startsWith('0x')) return 'ETH';
        if (addr.startsWith('1') || addr.startsWith('3')) return 'BTC';
        if (addr.startsWith('L')) return 'LTC';
        if (addr.startsWith('D')) return 'DOGE';
        return 'BTC'; // Default fallback
    };

    return (
        <div className="dashboard-container">
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

            <div className="transaction-chart">
                <h2>Transaction Count</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={transactionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <XAxis dataKey="month" stroke={theme === 'dark' ? '#fff' : '#000'} />
                        <YAxis stroke={theme === 'dark' ? '#fff' : '#000'} />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }} />
                        <Bar dataKey="received" fill="#2ecc71" />
                        <Bar dataKey="sent" fill="#e74c3c" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="transactions-section">
                <h2>Transactions</h2>
                <div className="transactions-table">
                    {transactions.map((tx, index) => (
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
                                <div>{tx.amount} {addressData.currency}</div>
                                <div className="usd-value">{tx.usdValue}</div>
                            </div>
                            <div className="tx-time">{tx.time}</div>
                        </div>
                    ))}
                </div>
            </div>

            <TransactionGraph theme={theme} address={address} />
        </div>
    );
};

export default AddressDetail;