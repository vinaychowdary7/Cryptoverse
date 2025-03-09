import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from './Loader';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const options = {
        method: 'GET',
        url: 'https://crypto-news16.p.rapidapi.com/news/all',
        headers: {
          'x-rapidapi-key': '1ea5c57c66msh8f2fb1f100b09dap110f3ejsn72a49385318f', // Secure API key using .env
          'x-rapidapi-host': 'crypto-news16.p.rapidapi.com',
        },
      };
      const response = await axios.request(options);
      setNews(response.data.yahoo || []); // Extract "yahoo" array safely
    } catch (error) {
      console.error('Error fetching news:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="p-5">
      <h2 className="text-white text-2xl mb-4">Latest Crypto News</h2>
      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {news.map((article, index) => (
            <div
              key={index}
              className="p-4 flex flex-col items-center justify-center white-glassmorphism rounded-lg text-white"
            >
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                <p className="font-bold mt-2">{article.title}</p>
                <p className="text-sm">{article.description}</p>
                <p className="text-xs opacity-75">{article.date}</p>
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default News;
