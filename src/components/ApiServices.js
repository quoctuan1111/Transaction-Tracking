import axios from 'axios';

// Define supported cryptocurrencies and their CoinMarketCap IDs
const cryptoConfig = {
  BITCOIN: { id: 1, symbol: 'BTC' },
  ETHEREUM: { id: 1027, symbol: 'ETH' },
  LITECOIN: { id: 2, symbol: 'LTC' },
  DOGECOIN: { id: 74, symbol: 'DOGE' }
};

const createClient = () => {
  return axios.create({
    baseURL: 'https://pro-api.coinmarketcap.com/v1',
    headers: {
      'X-CMC_PRO_API_KEY': process.env.REACT_APP_CMC_API_KEY, 
      Accept: 'application/json'
    }
  });
};

export const getCryptoData = async (selectedCrypto) => {
  const client = createClient();

  const config = cryptoConfig[selectedCrypto];
  if (!config) {
    throw new Error(`Unsupported cryptocurrency: ${selectedCrypto}`);
  }

  try {
    // Fetch cryptocurrency details
    const cryptoResponse = await client.get('/cryptocurrency/quotes/latest', {
      params: {
        id: config.id,
        convert: 'USD'
      }
    });

    // Fetch global metrics data
    const globalResponse = await client.get('/global-metrics/quotes/latest');

    // Simulated block and transaction data (replace with real data if available)
    const blocks = generateSimulatedBlocks();
    const transactions = generateSimulatedTransactions();

    // Process cryptocurrency data
    const cryptoData = cryptoResponse.data.data[config.id];
    const globalData = globalResponse.data.data;

    // Returning data in the mock data structure
    return {
      cryptoDetails: {
        name: cryptoData.name,
        symbol: cryptoData.symbol,
        price: cryptoData.quote.USD.price,
        volume_24h: cryptoData.quote.USD.volume_24h,
        market_cap: cryptoData.quote.USD.market_cap,
        percent_change_24h: cryptoData.quote.USD.percent_change_24h
      },
      globalMetrics: {
        total_market_cap: globalData.quote.USD.total_market_cap,
        total_volume_24h: globalData.quote.USD.total_volume_24h,
        btc_dominance: globalData.btc_dominance,
        eth_dominance: globalData.eth_dominance
      },
      blocks: blocks,
      transactions: transactions
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// Helper function to generate simulated block data (to match mock data format)
const generateSimulatedBlocks = () => {
  const currentTime = new Date();
  return Array.from({ length: 10 }, (_, i) => ({
    number: Math.floor(Math.random() * 1000000) + 7000000,
    timestamp: new Date(currentTime - i * 60000).toLocaleString(),
    transactions: Math.floor(Math.random() * 2000) + 500,
    size: (Math.random() * 2 + 1).toFixed(2),
    miner: `0x${Math.random().toString(16).slice(2, 42)}`
  })).sort((a, b) => b.number - a.number);
};

// Helper function to generate simulated transaction data (to match mock data format)
const generateSimulatedTransactions = () => {
  const currentTime = new Date();
  return Array.from({ length: 10 }, (_, i) => {
    const value = (Math.random() * 10).toFixed(4);
    return {
      hash: `0x${Math.random().toString(16).slice(2, 66)}`,
      from: `0x${Math.random().toString(16).slice(2, 42)}`,
      to: `0x${Math.random().toString(16).slice(2, 42)}`,
      value: value,
      fee: (value * 0.001).toFixed(4),
      timestamp: new Date(currentTime - i * 30000).toLocaleString()
    };
  });
};

export default {
  getCryptoData
};
