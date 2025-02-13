import React, { useState, useEffect } from 'react';
import "./AddressDetail.css";
import { getMockInteractions } from './MockData';

const TopInteractions = () => {
    const [interactions, setInteractions] = useState(null);

    useEffect(() => {
        setInteractions(getMockInteractions());
    }, []);

    const formatAddress = (address) => {
        if (!address) return '';
        return `${address.slice(0, 4)}....${address.slice(-3)}`;
    };

    if (!interactions) {
        return <div>Loading...</div>;
    }

    return (
        <div className="interactions-section">
            <h2>Top Interactions</h2>
            <div className="interactions-grid">
                <div className="sender-section">
                    <div className="interaction-header">
                        <span>Sender</span>
                        <span>Transactions</span>
                        <span>Percentages</span>
                    </div>
                    {interactions.senders.map((sender, index) => (
                        <div key={`sender-${index}`} className="interaction-row">
                            <span>{formatAddress(sender.address)}</span>
                            <span>{sender.transactions}</span>
                            <div className="percentage-container sender">
                                <div 
                                    className="percentage-bar" 
                                    style={{ width: `${sender.percentage}%` }}
                                ></div>
                                <span>{sender.percentage}%</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="receiver-section">
                    <div className="interaction-header">
                        <span>Receiver</span>
                        <span>Transactions</span>
                        <span>Percentages</span>
                    </div>
                    {interactions.receivers.map((receiver, index) => (
                        <div key={`receiver-${index}`} className="interaction-row">
                            <span>{formatAddress(receiver.address)}</span>
                            <span>{receiver.transactions}</span>
                            <div className="percentage-container receiver">
                                <div 
                                    className="percentage-bar" 
                                    style={{ width: `${receiver.percentage}%` }}
                                ></div>
                                <span>{receiver.percentage}%</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TopInteractions;