import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from './Loader';

const Currency = () => {
  const [cryptos, setCryptos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState(null); // Track selected coin
  const pageSize = 20;
  const totalAvailable = 100; // Coingecko allows 100 max items in free API

  const fetchCryptos = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: pageSize,
          page: page,
          sparkline: false
        }
      });

      setCryptos((prev) => [...prev, ...response.data]);
    } catch (error) {
      console.error('Error fetching cryptocurrencies:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCryptos();
  }, [page]);

  const remainingItems = totalAvailable - cryptos.length;

  return (
    <div className="p-5">
      <h2 className="text-white text-2xl mb-4">Cryptocurrency Prices</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {cryptos.map((coin, i) => (
          <div 
            key={coin.id} 
            className="p-10 h-64 flex flex-col items-center justify-center white-glassmorphism rounded-lg text-white cursor-pointer hover:bg-gray-700 transition"
            onClick={() => setSelectedCoin(coin)}
          >
            <img src={coin.image} alt={coin.name} className="w-10 h-10" />
            <p> {i + 1}. {coin.name} ({coin.symbol.toUpperCase()})</p>
            <p>Price: ${coin.current_price}</p>
          </div>
        ))}
      </div>

      {remainingItems > 0 && (
        <p className="text-center text-gray-400 mt-4">
          {remainingItems} more items available
        </p>
      )}

      <div className="flex justify-center mt-5">
        {remainingItems > 0 && (
          <button
            onClick={() => setPage(page + 1)}
            className="px-5 py-2 white-glassmorphism text-white rounded-lg hover:bg-gray-500 cursor-pointer transition"
            disabled={loading}
          >
            {loading ? <Loader /> : 'Load More'}
          </button>
        )}
      </div>

      {selectedCoin && (
        <div className="fixed inset-0  white-glassmorphism flex items-center justify-center z-50 left-1/12 w-10/12 h-10/12 top-1/12">
          <div className="p-6 rounded-lg w-full   text-white relative">
            
            <button 
              onClick={() => setSelectedCoin(null)}
              className="absolute top-2 right-3 text-gray-400 hover:text-white text-2xl"
            >
              ✖
            </button>

            <h3 className="text-xl font-semibold text-center mb-4">{selectedCoin.name} Price Chart</h3>

            
            <iframe 
              src={`https://www.tradingview.com/widgetembed/?symbol=BINANCE:${selectedCoin.symbol.toUpperCase()}USDT&interval=30&theme=dark`}
              className="w-full h-96"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default Currency;
