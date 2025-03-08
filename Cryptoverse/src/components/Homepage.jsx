import React from "react";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center px-16 overflow-hidden">
      <div className="relative w-full max-w-lg">
        
        <div
          className="absolute top-0 -left-4 w-72 h-72 bg-green-300 rounded-full filter blur-xl animate-[blob_7s_infinite_ease-in-out] animation-delay-2000"
          style={{
            animation: "blob 4s infinite",
          }}
        ></div>
        <div
          className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full filter blur-xl animate-[blob_7s_infinite_ease-in-out] animation-delay-4000"
          style={{
            animation: "blob 7s infinite",
          }}
        ></div>
        <div
          className="absolute -bottom-20 left-20 w-72 h-72 bg-purple-300 rounded-full filter blur-xl animate-[blob_7s_infinite_ease-in-out]"
          style={{
            animation: "blob 2s infinite",
          }}
        ></div>

        <div className="relative m-8 space-y-4 z-10">
          <div className="p-5 bg-white rounded-lg flex items-center justify-between space-x-8 shadow-lg font-bold text-red-800">
          "Decentralize finance, empower the world."
          </div>
          <div className="p-5 bg-white rounded-lg flex items-center justify-between space-x-8 shadow-lg text-blue-700 font-bold">
          "Blockchain secures, crypto empowers trust."
          </div>
          <div className="p-5 bg-white rounded-lg flex items-center justify-between space-x-8 shadow-lg text-stone-700 font-bold">
          "Future of money is decentralized."
          </div>
        </div>
      </div>
      <div>
      <div className="mt-20 md:ml-20 text-3xl font-semibold bg-gradient-to-r from-white via-indigo-500 to-pink-500 bg-clip-text text-transparent ">
        "Empowering Global Transactions, Unveiling Crypto Insights."
      </div>

        <div className="mt-10 md:ml-28 text-xl font-semibold text-gray-400">
        Cryptoverse is your ultimate gateway to the world of cryptocurrencies. Seamlessly send Ethereum across the globe with ease and security. Stay ahead with real-time insights on top cryptocurrencies, track their performance through dynamic graphs, and explore the leading crypto exchanges worldwide. Stay informed with the latest news on blockchain and cryptocurrency trends, all in one place.
        </div>
      </div>

      <style>
        {`
          @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
        `}
      </style>
    </div>
  );
};

export default HomePage;
