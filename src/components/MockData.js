// mockDataService.js

// Helper functions for generating mock data
const generateAddress = (type = 'ETH') => {
    const chars = '0123456789abcdef';
    switch (type) {
        case 'BTC':
            return '1' + Array.from({length: 33}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
        case 'ETH':
            return '0x' + Array.from({length: 40}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
        case 'LTC':
            return 'L' + Array.from({length: 33}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
        case 'DOGE':
            return 'D' + Array.from({length: 33}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
        default:
            return '0x' + Array.from({length: 40}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    }
};

const generateHash = () => {
    const chars = '0123456789abcdef';
    return '000000000000000' + Array.from({length: 64}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};

const generateTimestamp = (hoursAgo = 0) => {
    const date = new Date();
    date.setHours(date.getHours() - hoursAgo);
    return date.toISOString();
};

// Mock data for different cryptocurrencies
export const CURRENCIES = {
    BITCOIN: {
        symbol: 'BTC',
        miners: ['F2Pool', 'Foundry USA', 'AntPool', 'Binance Pool', 'ViaBTC'],
        blockSize: { min: 1000, max: 2000 },
        txPerBlock: { min: 1500, max: 3000 }
    },
    ETHEREUM: {
        symbol: 'ETH',
        miners: ['Ethermine', 'SparkPool', 'Nanopool', 'F2Pool ETH', 'Hiveon Pool'],
        blockSize: { min: 50, max: 150 },
        txPerBlock: { min: 100, max: 300 }
    },
    LITECOIN: {
        symbol: 'LTC',
        miners: ['LitecoinPool.org', 'AntPool LTC', 'ViaBTC LTC', 'F2Pool LTC', 'Poolin LTC'],
        blockSize: { min: 100, max: 500 },
        txPerBlock: { min: 50, max: 200 }
    },
    DOGECOIN: {
        symbol: 'DOGE',
        miners: ['DogeCoin Pool', 'AntPool DOGE', 'F2Pool DOGE', 'Poolin DOGE', 'ViaBTC DOGE'],
        blockSize: { min: 50, max: 200 },
        txPerBlock: { min: 20, max: 100 }
    }
};

// Mock data for blocks
export const getMockBlocks = (currency = 'ETHEREUM', count = 10) => {
    const config = CURRENCIES[currency];
    return Array.from({ length: count }, (_, i) => ({
        number: 824968 - i,
        timestamp: generateTimestamp(i),
        transactions: Math.floor(Math.random() * (config.txPerBlock.max - config.txPerBlock.min) + config.txPerBlock.min),
        size: (Math.random() * (config.blockSize.max - config.blockSize.min) + config.blockSize.min).toFixed(1),
        miner: config.miners[Math.floor(Math.random() * config.miners.length)],
        hash: generateHash()
    }));
};

// Mock data for transactions
export const getMockTransactions = (currency = 'ETHEREUM', count = 10) => {
    return Array.from({ length: count }, (_, i) => {
        const amount = (Math.random() * 5).toFixed(5);
        return {
            hash: generateHash(),
            from: generateAddress(currency),
            to: generateAddress(currency),
            value: amount,
            fee: (amount * 0.001).toFixed(5),
            timestamp: generateTimestamp(i * 0.1)
        };
    });
};

// Mock data for top interactions
export const getMockInteractions = () => ({
    senders: [
        { address: generateAddress(), transactions: 15, percentage: 50 },
        { address: generateAddress(), transactions: 9, percentage: 30 },
        { address: generateAddress(), transactions: 6, percentage: 20 }
    ],
    receivers: [
        { address: generateAddress(), transactions: 12, percentage: 40 },
        { address: generateAddress(), transactions: 9, percentage: 30 },
        { address: generateAddress(), transactions: 6, percentage: 20 },
        { address: generateAddress(), transactions: 3, percentage: 10 }
    ]
});

// Mock data for transaction graph
export const getMockTransactionGraph = (address) => ({
    nodes: [
        { id: address, balance: '0.00107 ETH' },
        { id: generateAddress(), balance: '0.02143 ETH' },
        { id: generateAddress(), balance: '0.00000 ETH' },
        { id: generateAddress(), balance: '0.00010 ETH' }
    ],
    edges: [
        { source: address, target: generateAddress(), value: '0.00107' },
        { source: address, target: generateAddress(), value: '0.00000' },
        { source: address, target: generateAddress(), value: '0.00010' }
    ]
});

// Mock data for address details
export const getMockAddressDetails = (address, currency = 'ETHEREUM') => ({
    balance: (Math.random() * 10).toFixed(5),
    currency: CURRENCIES[currency].symbol,
    changePercentage: (Math.random() * 10 - 5).toFixed(2),
    firstActive: generateTimestamp(24 * 30),
    lastActive: generateTimestamp(0),
    sentCount: Math.floor(Math.random() * 50) + 1,
    receivedCount: Math.floor(Math.random() * 50) + 1,
    totalCount: Math.floor(Math.random() * 100) + 1,
    sentAmount: (Math.random() * 5).toFixed(5),
    receivedAmount: (Math.random() * 5).toFixed(5),
    transactionHistory: Array.from({ length: 5 }, (_, i) => ({
        month: ['Jan', 'Feb', 'Mar', 'Apr', 'May'][i],
        received: Math.floor(Math.random() * 10),
        sent: Math.floor(Math.random() * 10)
    }))
});

// Get all mock data for an address
export const getFullAddressData = (address, currency = 'ETHEREUM') => ({
    ...getMockAddressDetails(address, currency),
    transactions: getMockTransactions(currency, 5),
    transactionGraph: getMockTransactionGraph(address),
    interactions: getMockInteractions()
});

// Get all mock data for main dashboard
export const getDashboardData = (currency = 'ETHEREUM') => ({
    blocks: getMockBlocks(currency),
    transactions: getMockTransactions(currency),
    marketData: {
        price: Math.random() * 2000 + 1000,
        priceChange24h: (Math.random() * 10 - 5).toFixed(2),
        volume24h: Math.random() * 1000000000,
        marketCap: Math.random() * 100000000000
    }
});

export default {
    getFullAddressData,
    getDashboardData,
    CURRENCIES
};