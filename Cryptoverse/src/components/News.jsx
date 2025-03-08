import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from './Loader';

const News = () => {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);

  const pageSize = 20;  // Number of articles per request

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://newsapi.org/v2/everything', {
        params: {
          q: 'cryptocurrency',
          sortBy: 'publishedAt',
          apiKey: '9a3b10f5968546c9a10bd9b8820b4f4d',
          page: page,  
          pageSize: pageSize,
        },
      });

      setNews((prevNews) => [...prevNews, ...response.data.articles]); // Append new articles
      setTotalResults(response.data.totalResults);  // Set total articles available
    } catch (error) {
      console.error('Error fetching news:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();  // Fetch data when `page` changes
  }, [page]);

  const remainingArticles = totalResults - news.length;

  return (
    <div className="p-5">
      <h2 className="text-white text-2xl mb-4">Latest Crypto News</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {news.map((article, index) => (
          <div key={index} className="p-4 flex flex-col items-center justify-center white-glassmorphism rounded-lg text-white">
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-40 object-cover rounded-lg"
              />
              <p className="font-bold mt-2">{article.title}</p>
              <p className="text-sm">{article.source.name}</p>
            </a>
          </div>
        ))}
      </div>

      {/* Show remaining articles count */}
      {remainingArticles > 0 && (
        <p className="text-center text-gray-400 mt-4">
          {remainingArticles} more articles available
        </p>
      )}

      {/* Load More Button */}
      <div className="flex justify-center mt-5">
        {remainingArticles > 0 && (
          <button
            onClick={() => setPage(page + 1)}
            className="px-5 py-2 white-glassmorphism text-white rounded-lg hover:bg-gray-500 cursor-pointer transition"
            disabled={loading}
          >
            {loading ? <Loader/> : 'Load More'}
          </button>
        )}
      </div>
    </div>
  );
};

export default News;
