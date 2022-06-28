import { useState, useEffect, useContext } from "react";
import { userService } from "../services/userService";
import { bitcoinService } from "../services/bitcoinService";
import { MoveList } from "../components/MoveList";
import { ChartComponent } from "../components/chart";
import { AppContext } from "../App";
import Spinner from "../components/spinner";

export const HomePage = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [chartData, setChartData] = useState(null);
  const btcUSDprice = useContext(AppContext);

  useEffect(() => {
    const user = userService.getUser();
    setUserDetails(user);
    bitcoinService
      .getBitCoinData(bitcoinService.MarketPriceURL)
      .then((MarketPricedata) =>
        setChartData({
          name: MarketPricedata.name,
          data: bitcoinService.unixTimestampConverterFromApi(
            MarketPricedata.values
          ),
        })
      );
  }, []);

  //number formatter to USD
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  if (!userDetails) return <Spinner />;
  return (
    <div className="home-page">
      <div className="home-page-container">
        <div className="home-page-user-container">
          <h1>Hi,{userDetails.name}</h1>
        </div>
        <div className="finance-info-container">
          <div className="current-btc-blance-container">
            <h5>Current Blance</h5>
            <p>
              BIT:<span className="bit-coin-balance">₿{userDetails.coins}</span>
            </p>
            <p>
              USD:
              {formatter.format(
                (userDetails.coins * btcUSDprice.bitCoinUsdPrice).toFixed(2)
              )}
            </p>
          </div>
          <div className="current-usd-blance-container">
            <h5>Current BTC USD</h5>
            <p className="bit-coin-rate">
              {formatter.format(btcUSDprice.bitCoinUsdPrice)}
            </p>
          </div>
        </div>
        <div className="home-page-chart">
          {chartData && <ChartComponent chartData={chartData} width="100%" />}
        </div>
        <div className="moves-box">
          <MoveList />
        </div>
      </div>
    </div>
  );
};
