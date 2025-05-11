function calculateSMA(prices, period) {
    return prices.slice(-period).reduce((a, b) => a + b, 0) / period;
  }
  
  function calculateRSI(prices, period = 14) {
    let gains = 0, losses = 0;
    for (let i = 1; i < prices.length; i++) {
      const diff = prices[i] - prices[i - 1];
      if (diff >= 0) gains += diff;
      else losses -= diff;
    }
    return 100 - (100 / (1 + (gains / losses)));
  }
  
  function detectSignal(candles) {
    const closes = candles.map(c => parseFloat(c[4]));
    const rsi = calculateRSI(closes);
    const sma5 = calculateSMA(closes, 5);
    const sma20 = calculateSMA(closes, 20);
  
    if (rsi < 30 && sma5 > sma20) return { signal: "STRONG_BUY", confidence: 85 };
    if (rsi > 70 && sma5 < sma20) return { signal: "STRONG_SELL", confidence: 85 };
    if (sma5 > sma20) return { signal: "BUY", confidence: 70 };
    if (sma5 < sma20) return { signal: "SELL", confidence: 70 };
    return { signal: "NEUTRAL", confidence: 50 };
  }
  
  module.exports = { detectSignal, calculateRSI };