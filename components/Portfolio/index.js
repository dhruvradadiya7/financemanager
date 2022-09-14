// Icons
import {
  fetchMostActive,
  fetchTickerResults,
  fetchSingleTicker,
  fetchBatchTicker,
} from 'containers/fetchStocks';
import { ReactComponent as EditIcon } from 'icons/edit.svg';
import { ReactComponent as AddIcon } from 'icons/add.svg';
import { ReactComponent as SearchIcon } from 'icons/search.svg';
import { useEffect, useState } from 'react';
import { fixedInt, useDebounce, writePrice } from 'utils/shared';
import getObj from 'utils/fetchfb';
import { useAuth } from 'utils/AuthContext';
import SharesPicker from './SharesPicker';

const Portfolio = () => {
  const { currentUser } = useAuth();
  const [activeStocks, setActiveStocks] = useState([]);
  const [searchedStocks, setSearchedStocks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [searchedResult, setSearchedResult] = useState([]);
  const [portfolioTickerObj, setPortfolioTickerObj] = useState({});
  const [myPortfolio, setMyPortfolio] = useState([]);
  const [editPortfolio, setEditPortfolio] = useState(false);
  const debouncedSearchTerm = useDebounce(inputValue, 500);

  const getNSetPortfolio = async () => {
    let portfolio = await getObj(`${currentUser.uid}/portfolio`);
    let tickers = [];
    let portfolioValues = [];
    if (portfolio.ticker) {
      tickers = [portfolio.ticker];
    } else {
      portfolioValues = portfolioValues ? Object.values(portfolio) : [];
      tickers = portfolioValues.map((e) => e.ticker);
    }
    const portfolioKeys = Object.keys(portfolio);
    tickers = await fetchBatchTicker(tickers);
    tickers = tickers.map((e, i) => (e.status === 'fulfilled' ? {
      investedPrice: portfolioValues[i]?.price, _id: portfolioKeys[i], investedShares: portfolioValues[i]?.shares, ...e.value.data[0],
    } : null));
    setMyPortfolio(tickers);
  };

  const getNSetStockInit = async () => {
    try {
      const result = await fetchMostActive();
      setActiveStocks(result.data);
      getNSetPortfolio();
    } catch (e) {
      console.log(e);
    }
  };

  const getNUpdateResult = async (ticker) => {
    const result = await fetchSingleTicker(ticker);
    setSearchedStocks(result.data);
    setSearchedResult([]);
  };

  const handleClickOnAdd = (obj, edit) => {
    setPortfolioTickerObj({
      ticker: obj.ticker || obj.symbol,
      price: obj.price,
      edit,
      ...obj,
    });
  };

  // Effect for API call
  useEffect(
    () => {
      setSearchValue(debouncedSearchTerm);
    },
    [debouncedSearchTerm], // Only call effect if debounced search term changes
  );

  const fetchResults = async () => {
    const results = await fetchTickerResults(searchValue);
    setSearchedResult(results.data || []);
  };

  useEffect(() => {
    if (searchValue) {
      fetchResults();
    } else {
      setSearchedResult([]);
    }
  }, [searchValue]);

  useEffect(() => {
    getNSetStockInit();
  }, []);

  const stockList = searchedStocks.length ? searchedStocks : activeStocks;
  return (
    <div className="portfolio_main-content-box fcss">
      <div className="frcb portfolio_main-content_header">
        <h3>My Portfolio</h3>
        <div className="frcb portfolio_main-content_header-actions">
          <button
            type="button"
            className="frcc portfolio_main-content_header-action portfolio_main-content-btn"
            onClick={() => setEditPortfolio(!editPortfolio)}
          >
            <p>
              <EditIcon className="portfolio_main-content-btn-icon" />
              {editPortfolio ? 'Cancel' : 'Edit Portfolio'}
            </p>
          </button>
        </div>
      </div>

      <div className="portfolio_active-stocks_wrapper">
        {myPortfolio
          .filter((e) => e)
          .map((stockData, index) => (
            <div
              key={stockData.ticker || index}
              className={`frcb portfolio_active-stock-card-wrapper ${editPortfolio && 'edit'}`}
            >
              <div className="portfolio_active-stock-card frcb">
                <div className="fcss">
                  <h3 className="portfolio_active-stock-ticker">
                    {stockData.ticker || stockData.symbol}
                  </h3>
                  <p className="portfolio_active-stock-company-name">
                    {stockData.companyName || stockData.name}
                  </p>
                </div>
                <div className="frcs">
                  <p className="portfolio_active-stock-price">
                    {writePrice(fixedInt(stockData?.price, 2))}
                  </p>
                  <div className="fcce portfolio_active-stock-change-box">
                    <p className="portfolio_active-stock-change">
                      {writePrice(
                        fixedInt(stockData?.changes || stockData?.change, 2),
                        '+',
                      )}
                    </p>
                    <p
                      className={`portfolio_active-stock-change-pr ${stockData.changesPercentage > 0 && 'gained'} ${stockData.changesPercentage < 0 && 'lost'}`}
                    >
                      {fixedInt(stockData?.changesPercentage, 2)}
                      %
                    </p>
                  </div>
                </div>
              </div>

              <button
                className="portfolio_active-stock-add edit frcc"
                title="Edit to portfolio"
                onClick={() => handleClickOnAdd(stockData, true)}
              >
                <EditIcon />
              </button>
            </div>
          ))}
      </div>

      <div className="frcb portfolio_main-content_header">
        <h3>Explore trending stocks</h3>
        <div className="portfolio_main-content_search-box">
          <SearchIcon className="portfolio_main-content_search-icon" />
          <input
            type="text"
            className="portfolio_main-content_search-input"
            onChange={(e) => setInputValue(e.target.value)}
          />
          {!!searchedResult.length && (
            <div className="fccs portfolio_main-content-search-result">
              {searchedResult.map((e) => (
                <button
                  className="frcc portfolio_main-content-search-result-btn"
                  onClick={() => getNUpdateResult(e.symbol)}
                >
                  {e.symbol}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="portfolio_active-stocks_wrapper">
        {stockList.map((stockData) => (
          <div
            key={stockData.ticker}
            className="frcb portfolio_active-stock-card-wrapper"
          >
            <div className="portfolio_active-stock-card frcb">
              <div className="fcss">
                <h3 className="portfolio_active-stock-ticker">
                  {stockData.ticker || stockData.symbol}
                </h3>
                <p className="portfolio_active-stock-company-name">
                  {stockData.companyName || stockData.name}
                </p>
              </div>
              <div className="frcs">
                <p className="portfolio_active-stock-price">
                  {writePrice(fixedInt(stockData?.price, 2))}
                </p>
                <div className="fcce portfolio_active-stock-change-box">
                  <p className="portfolio_active-stock-change">
                    {writePrice(
                      fixedInt(stockData?.changes || stockData?.change, 2),
                      '+',
                    )}
                  </p>
                  <p
                    className={`portfolio_active-stock-change-pr ${stockData.changesPercentage > 0 && 'gained'
                      } ${stockData.changesPercentage < 0 && 'lost'}`}
                  >
                    {fixedInt(stockData?.changesPercentage, 2)}
                    %
                  </p>
                </div>
              </div>
            </div>

            <button
              className="portfolio_active-stock-add frcc"
              title="Add to portfolio"
              onClick={() => handleClickOnAdd(stockData)}
            >
              <AddIcon />
            </button>
          </div>
        ))}
      </div>
      {portfolioTickerObj?.ticker && (
        <SharesPicker
          onClose={() => {
            setPortfolioTickerObj({});
            getNSetPortfolio();
          }}
          {...portfolioTickerObj}
        />
      )}
    </div>
  );
};

export default Portfolio;
