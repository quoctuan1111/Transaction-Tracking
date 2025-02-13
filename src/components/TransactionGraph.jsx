import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertCircle } from 'lucide-react';

const TransactionGraph = ({ address, theme }) => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [graphData, setGraphData] = useState({
    nodes: [
      { id: '0xc7317c...3cbc739a', balance: '0.00107 ETH' },
      { id: '0x1ef75d...f487b02c', balance: '0.02143 ETH' },
      { id: '0x0c45dd...599afb8', balance: '0.00000 ETH' },
      { id: '0xb0606f...d84445cd', balance: '0.00010 ETH' }
    ],
    edges: [
      { source: '0xc7317c...3cbc739a', target: '0x1ef75d...f487b02c', value: '0.00107' },
      { source: '0xc7317c...3cbc739a', target: '0x0c45dd...599afb8', value: '0.00000' },
      { source: '0xc7317c...3cbc739a', target: '0xb0606f...d84445cd', value: '0.00010' }
    ]
  });

  const [nodePositions, setNodePositions] = useState({});

  useEffect(() => {
    // Calculate initial node positions in a circular layout
    const radius = 150;
    const angleStep = (2 * Math.PI) / graphData.nodes.length;
    
    const positions = {};
    graphData.nodes.forEach((node, index) => {
      const angle = index * angleStep;
      positions[node.id] = {
        x: radius * Math.cos(angle) + 200,
        y: radius * Math.sin(angle) + 200
      };
    });
    
    setNodePositions(positions);
  }, [graphData]);

  const handleNodeClick = (nodeId) => {
    setSelectedNode(nodeId);
    // Here you would typically fetch and update connected nodes
  };

  return (
    <div className="transaction-graph">
      <div className="graph-header">
        <h2 className="graph-title">
          <AlertCircle className="h-5 w-5" />
          Transaction Network
        </h2>
      </div>
      <div className="graph-content">
        <div className="graph-container">
          <svg width="100%" height="100%" viewBox="0 0 400 400">
            {/* Draw edges */}
            {graphData.edges.map((edge, index) => (
              <g key={`edge-${index}`}>
                <line
                  x1={nodePositions[edge.source]?.x}
                  y1={nodePositions[edge.source]?.y}
                  x2={nodePositions[edge.target]?.x}
                  y2={nodePositions[edge.target]?.y}
                  stroke={theme === 'dark' ? '#ffffff40' : '#00000040'}
                  strokeWidth="2"
                  className="edge"
                />
                <text
                  x={(nodePositions[edge.source]?.x + nodePositions[edge.target]?.x) / 2}
                  y={(nodePositions[edge.source]?.y + nodePositions[edge.target]?.y) / 2}
                  fill={theme === 'dark' ? '#fff' : '#000'}
                  fontSize="12"
                  textAnchor="middle"
                  className="edge-label"
                >
                  {edge.value} ETH
                </text>
              </g>
            ))}
            
            {/* Draw nodes */}
            {graphData.nodes.map((node) => (
              <g
                key={node.id}
                transform={`translate(${nodePositions[node.id]?.x},${nodePositions[node.id]?.y})`}
                onClick={() => handleNodeClick(node.id)}
                className={`node ${selectedNode === node.id ? 'node-selected' : ''}`}
              >
                <circle
                  r="30"
                  fill={selectedNode === node.id ? '#4CAF50' : '#2196F3'}
                  opacity="0.8"
                />
                <text
                  y="-5"
                  textAnchor="middle"
                  fill={theme === 'dark' ? '#fff' : '#000'}
                  fontSize="12"
                  className="node-label"
                >
                  {node.id.substring(0, 8)}
                </text>
                <text
                  y="15"
                  textAnchor="middle"
                  fill={theme === 'dark' ? '#fff' : '#000'}
                  fontSize="10"
                  className="node-label"
                >
                  {node.balance}
                </text>
              </g>
            ))}
          </svg>
        </div>
        
        {selectedNode && (
          <div className="node-details">
            <h3 className="details-title">Selected Address: {selectedNode}</h3>
            <div className="details-grid">
              <div className="connected-addresses">
                <p className="details-label">Connected Addresses</p>
                <ul className="address-list">
                  {graphData.edges
                    .filter(edge => edge.source === selectedNode || edge.target === selectedNode)
                    .map((edge, index) => (
                      <li key={index} className="address-item">
                        {edge.source === selectedNode ? edge.target : edge.source}
                      </li>
                    ))}
                </ul>
              </div>
              <div className="transaction-volume">
                <p className="details-label">Transaction Volume</p>
                <div className="volume-chart">
                  <ResponsiveContainer width="100%" height={100}>
                    <LineChart data={[
                      { date: '2024-01', value: 0.5 },
                      { date: '2024-02', value: 1.2 },
                      { date: '2024-03', value: 0.8 }
                    ]}>
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Line type="monotone" dataKey="value" stroke="#8884d8" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionGraph;