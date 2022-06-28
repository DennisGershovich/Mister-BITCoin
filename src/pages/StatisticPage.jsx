import { useEffect, useState } from "react";
import { ChartComponent } from "../components/chart.jsx";
import { bitcoinService } from "../services/bitcoinService.js";


export const StatisticPage = () => {
  const [bitcoinTradeData, setBitcoinTradeData] = useState(null);
  const [bitcoinMarketPriceData, setBitcoinMarketPriceData] = useState(null);

  useEffect(() => {
    // fetch trade data
    bitcoinService
      .getBitCoinData(bitcoinService.TradeVolumeURL)
      .then((TradeVolumedata) => {
        setBitcoinTradeData({
          name: TradeVolumedata.name,
          data: bitcoinService.unixTimestampConverterFromApi(
            TradeVolumedata.values
          ),
        });
      });
    //fetch market price data
    bitcoinService
      .getBitCoinData(bitcoinService.MarketPriceURL)
      .then((MarketPricedata) =>
        setBitcoinMarketPriceData({
          name: MarketPricedata.name,
          data: bitcoinService.unixTimestampConverterFromApi(
            MarketPricedata.values
          ),
        })
      );
  }, []);

  return (
    <div className="statistics-page">
      <h1>Statistics</h1>
      {bitcoinTradeData && <ChartComponent chartData={bitcoinTradeData} />}
      {bitcoinMarketPriceData && (
        <ChartComponent chartData={bitcoinMarketPriceData} />
      )}
    </div>
  );
};
