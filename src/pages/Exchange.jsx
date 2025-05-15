import React, { useState } from 'react'
import Header from '../components/Header'
import { HamMenuProvider } from '../contexts/HamMenuContext'
import { RiRobot2Line } from 'react-icons/ri'
import { IoMdClose } from 'react-icons/io'

const Exchange = () => {
  const [fromCurrency, setFromCurrency] = useState('BTC');
  const [toCurrency, setToCurrency] = useState('ETH');
  const [amount, setAmount] = useState('');
  const [exchangeRate, setExchangeRate] = useState(null);
  const [showNewsPopup, setShowNewsPopup] = useState(false);
  const [newsLoading, setNewsLoading] = useState(false);

  // Mock exchange rates (in a real app, you would fetch these from an API)
  const mockRates = {
    'BTC-ETH': 16.5,
    'BTC-SOL': 580,
    'BTC-USDT': 65000,
    'ETH-BTC': 0.06,
    'ETH-SOL': 35,
    'ETH-USDT': 3900,
    'SOL-BTC': 0.0017,
    'SOL-ETH': 0.028,
    'SOL-USDT': 110,
    'USDT-BTC': 0.000015,
    'USDT-ETH': 0.00026,
    'USDT-SOL': 0.009,
  };

  // Mock news for each cryptocurrency (in a real app, you would fetch these from a news API)
  const mockNews = {
    'BTC': [
      { title: "Bitcoin hits new all-time high as institutional adoption grows", summary: "Bitcoin reached a new all-time high today as more institutional investors add BTC to their portfolios." },
      { title: "Major bank launches Bitcoin trading services", summary: "A major international bank has launched Bitcoin trading services for its institutional clients, signaling wider acceptance." },
      { title: "Bitcoin mining becomes more energy efficient", summary: "New data shows Bitcoin mining operations are increasingly using renewable energy sources." }
    ],
    'ETH': [
      { title: "Ethereum 2.0 upgrade progressing faster than expected", summary: "The transition to Ethereum 2.0 is moving ahead of schedule, promising improved scalability and reduced gas fees." },
      { title: "NFT market on Ethereum sees renewed growth", summary: "The market for NFTs on the Ethereum blockchain is experiencing a resurgence after months of cooling off." },
      { title: "New Ethereum layer-2 solution promises 100x lower fees", summary: "A new scaling solution for Ethereum has been launched with claims of drastically reducing transaction costs." }
    ],
    'SOL': [
      { title: "Solana network experiences record transaction volume", summary: "The Solana blockchain processed a record number of transactions this week without any performance issues." },
      { title: "Major DeFi project migrates from Ethereum to Solana", summary: "A popular decentralized finance project has announced plans to move from Ethereum to Solana." },
      { title: "Solana launches $100 million fund for crypto startups", summary: "The Solana Foundation has created a new fund to support innovative projects building on the network." }
    ],
    'USDT': [
      { title: "Tether releases new transparency report", summary: "Tether has published its latest reserves attestation, showing all USDT tokens are fully backed." },
      { title: "USDT trading volume reaches new record", summary: "Trading volume for Tether has reached unprecedented levels as market volatility increases." },
      { title: "New regulations may impact stablecoins like USDT", summary: "Regulatory bodies are considering new rules that could affect how stablecoins like USDT operate." }
    ]
  };

  const calculateExchange = () => {
    const pair = `${fromCurrency}-${toCurrency}`;
    if (fromCurrency === toCurrency) {
      return amount;
    }
    return (amount * mockRates[pair]).toFixed(8);
  };

  const handleSwap = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount && fromCurrency && toCurrency) {
      setExchangeRate(calculateExchange());
    }
  };

  const handleShowNews = () => {
    setNewsLoading(true);
    setShowNewsPopup(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setNewsLoading(false);
    }, 1000);
  };

  return (
    <>
      <HamMenuProvider>
        <Header />
        <div className="exchange-container">
          <div className="exchange-card">
            <h2>Exchange Crypto</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label>From</label>
                <div className="currency-input">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    required
                  />
                  <select 
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                  >
                    <option value="BTC">BTC</option>
                    <option value="ETH">ETH</option>
                    <option value="SOL">SOL</option>
                    <option value="USDT">USDT</option>
                  </select>
                </div>
              </div>
              
              <button type="button" className="swap-button" onClick={handleSwap}>
                ↑↓
              </button>
              
              <div className="input-group">
                <label>To</label>
                <div className="currency-input">
                  <input
                    type="number"
                    value={exchangeRate || ''}
                    readOnly
                    placeholder="Converted amount"
                  />
                  <select 
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                  >
                    <option value="BTC">BTC</option>
                    <option value="ETH">ETH</option>
                    <option value="SOL">SOL</option>
                    <option value="USDT">USDT</option>
                  </select>
                </div>
              </div>
              
              <div className="button-group">
                <button type="submit" className="exchange-button">
                  Convert
                </button>
                <button 
                  type="button" 
                  className="ai-button"
                  onClick={handleShowNews}
                  title={`Get latest ${toCurrency} news`}
                >
                  <RiRobot2Line size={20} />
                </button>
              </div>
            </form>
            
            {exchangeRate && (
              <div className="exchange-result">
                <p>
                  {amount} {fromCurrency} = {exchangeRate} {toCurrency}
                </p>
                <p className="disclaimer">
                  *Rates are for demonstration purposes only. Use BitGet for actual trading.
                </p>
              </div>
            )}
          </div>
        </div>
        
        {showNewsPopup && (
          <div className="news-popup-overlay" onClick={() => setShowNewsPopup(false)}>
            <div className="news-popup" onClick={(e) => e.stopPropagation()}>
              <div className="news-popup-header">
                <h3>Latest {toCurrency} News</h3>
                <button 
                  className="close-button" 
                  onClick={() => setShowNewsPopup(false)}
                >
                  <IoMdClose size={22} />
                </button>
              </div>
              
              <div className="news-popup-content">
                {newsLoading ? (
                  <div className="loading-indicator">
                    <div className="spinner"></div>
                    <p>Getting the latest news...</p>
                  </div>
                ) : (
                  <div className="news-list">
                    {mockNews[toCurrency].map((item, index) => (
                      <div className="news-item" key={index}>
                        <h4>{item.title}</h4>
                        <p>{item.summary}</p>
                      </div>
                    ))}
                    <p className="news-disclaimer">
                      AI-powered news summaries are for informational purposes only. Always do your own research before investing.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </HamMenuProvider>
    </>
  )
}

export default Exchange 