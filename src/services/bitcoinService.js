import axios from 'axios';
const MarketPriceURL ="https://api.blockchain.info/charts/market-price?timespan=12months&format=json&cors=true"
const TradeVolumeURL = "https://api.blockchain.info/charts/trade-volume?timespan=5months&format=json&cors=true"
const BitCoinValueURL = "https://blockchain.info/ticker"
let gBitCoinPriceUSD
export const bitcoinService = {
    getRate,
    getBitCoinData,
    MarketPriceURL,
    TradeVolumeURL,
    unixTimestampConverterFromApi,
}

async function getRate (coin = 1){
     if(gBitCoinPriceUSD){
      return Promise.resolve( gBitCoinPriceUSD)}
      else{
     const bitCoinRateRes = await axios.get(BitCoinValueURL)
     const data = await bitCoinRateRes.data     
     gBitCoinPriceUSD = data.USD.last 
     return gBitCoinPriceUSD
      }

}

async function getBitCoinData(url){
    let res = await axios.get(url)
    let data = await res.data;
    return data
}

function unixTimestampConverterFromApi(array){
    return array.map((cord) => ({ y: cord.y, x: cord.x * 1000 }))
} 
