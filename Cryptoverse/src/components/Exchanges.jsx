import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from './Loader';

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedExchange, setSelectedExchange] = useState(null); // Track selected exchange
  const pageSize = 10;
  const totalAvailable = 100; // Coingecko provides 100 exchanges max

  const fetchExchanges = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/exchanges', {
        params: {
          per_page: pageSize,
          page: page
        }
      });
      setExchanges((prev) => [...prev, ...response.data]);
    } catch (error) {
      console.error('Error fetching exchanges:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchExchanges();
  }, [page]);

  const remainingItems = totalAvailable - exchanges.length;

  return (
    <div className="p-10">
      <h2 className="text-white text-2xl mb-4">Top Crypto Exchanges</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
        {exchanges.map((exchange) => (
          <div 
            key={exchange.id} 
            className="p-10 h-64 flex flex-col items-center justify-center white-glassmorphism rounded-lg text-white cursor-pointer hover:bg-gray-700 transition"
            onClick={() => setSelectedExchange(exchange)}
          >
            <img src={exchange.image} alt={exchange.name} className="w-10 h-10" />
            <p>{exchange.name}</p>
            <p>Trade Volume: ${exchange.trade_volume_24h_btc.toFixed(2)} BTC</p>
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

      {/* Modal for Exchange Details */}
      {selectedExchange && (
        <div className="fixed inset-0 white-glassmorphism flex items-center justify-center z-50 w-2/3 h-2/3 translate translate-x-1/3 translate-y-1/3">
          <div className="p-6 rounded-lg w-full text-green-200 relative">
            
            <button 
              onClick={() => setSelectedExchange(null)}
              className="absolute top-2 right-3 hover:text-green-400 text-green-200 text-2xl"
            >
              ✖
            </button>
            <div className='flex flex-col items-center justify-center'>
              <h3 className="text-xl font-semibold text-center mb-4">{selectedExchange.name} Details</h3>
              
              <p><strong>Country:</strong> {selectedExchange.country || 'N/A'}</p>
              <p><strong>Year Established:</strong> {selectedExchange.year_established || 'N/A'}</p>
              <p><strong>Trust Score:</strong> {selectedExchange.trust_score}</p>
              <p><strong>24h Trade Volume:</strong> ${selectedExchange.trade_volume_24h_btc.toFixed(2)} BTC</p>
              <p><strong>Website:</strong> <a href={selectedExchange.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">Visit</a></p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Exchanges;
