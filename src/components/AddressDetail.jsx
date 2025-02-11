import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import "./AddressDetail.css";

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
    const transactionData = [
        { month: 'Oct', received: 1, sent: 0 },
        { month: 'Nov', received: 0, sent: 1 },
        { month: 'Feb', received: 1, sent: 0 },
        { month: 'Apr', received: 0, sent: 1 },
        { month: 'Oct', received: 0, sent: 1 }
    ];

    const transactions = [
        {
            sender: '0xc7317c...3cbc739a',
            receiver: '0x1ef75d...f487b02c',
            amount: '0.00107 ETH',
            usdValue: '≈ $2.31 USD',
            time: '10:45am 09/10/2024'
        },
        {
            sender: '0xc7317c...3cbc739a',
            receiver: '0x0c45dd...599afb8',
            amount: '0 ETH',
            usdValue: '≈ $0 USD',
            time: '10:02am 20/04/2023'
        },
        {
            sender: '0xc7317c...3cbc739a',
            receiver: '0x0c45dd...599afb8',
            amount: '0 ETH',
            usdValue: '≈ $0 USD',
            time: '07:46am 06/02/2023'
        },
        {
            sender: '0xc7317c...3cbc739a',
            receiver: '0xb0606f...d84445cd',
            amount: '0.0001 ETH',
            usdValue: '≈ $0.23 USD',
            time: '03:24pm 02/11/2022'
        },
        {
            sender: '0xc7317c...3cbc739a',
            receiver: '0x0c45dd...599afb8',
            amount: '0 ETH',
            usdValue: '≈ $0 USD',
            time: '09:39am 09/10/2022'
        }
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
                        <Tooltip
                            content={<CustomTooltip />}
                            cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
                        />
                        <Bar dataKey="received" fill="#2ecc71" />
                        <Bar dataKey="sent" fill="#e74c3c" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="interactions-section">
                <h2>Top Interactions</h2>
                <div className="interactions-grid">
                    <div className="sender-section">
                        <div className="interaction-header">
                            <span>Sender</span>
                            <span>Transactions</span>
                            <span>Percentages</span>
                        </div>
                        <div className="interaction-row">
                            <span>0x37....50f</span>
                            <span>1</span>
                            <div className="percentage-container sender">
                                <div className="percentage-bar" style={{ width: '50%' }}></div>
                                <span>50%</span>
                            </div>
                        </div>
                        <div className="interaction-row">
                            <span>0x37....51f</span>
                            <span>1</span>
                            <div className="percentage-container sender">
                                <div className="percentage-bar" style={{ width: '50%' }}></div>
                                <span>50%</span>
                            </div>
                        </div>
                    </div>

                    <div className="receiver-section">
                        <div className="interaction-header">
                            <span>Receiver</span>
                            <span>Transactions</span>
                            <span>Percentages</span>
                        </div>
                        <div className="interaction-row">
                            <span>0x23....78f</span>
                            <span>1</span>
                            <div className="percentage-container receiver">
                                <div className="percentage-bar" style={{ width: '33.3%' }}></div>
                                <span>33.3%</span>
                            </div>
                        </div>
                        <div className="interaction-row">
                            <span>0x63....28f</span>
                            <span>1</span>
                            <div className="percentage-container receiver">
                                <div className="percentage-bar" style={{ width: '33.3%' }}></div>
                                <span>33.3%</span>
                            </div>
                        </div>
                        <div className="interaction-row">
                            <span>0x22....97f</span>
                            <span>1</span>
                            <div className="percentage-container receiver">
                                <div className="percentage-bar" style={{ width: '33.3%' }}></div>
                                <span>33.3%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="transactions-section">
                <h2>Transactions</h2>
                <div className="transactions-table">
                    {transactions.map((tx, index) => (
                        <div key={index} className="transaction-row">
                            <div className="tx-addresses">
                                <div className="address-pair">
                                    <span className="label">From:</span>
                                    <span className="address">{tx.sender}</span>
                                </div>
                                <div className="address-pair">
                                    <span className="label">To:</span>
                                    <span className="address">{tx.receiver}</span>
                                </div>
                            </div>
                            <div className="tx-amount">
                                <div>{tx.amount}</div>
                                <div className="usd-value">{tx.usdValue}</div>
                            </div>
                            <div className="tx-time">{tx.time}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AddressDetail;