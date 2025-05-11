// Config
const API_URL = "agile-delight-production.up.railway.app"; // MUST match exactly

// DOM Elements
const signalBtn = document.getElementById('get-signal');
const pairSelect = document.getElementById('pair-select');
const resultDiv = document.getElementById('signal-result');

// Fetch Signal (with error handling)
async function fetchSignal(pair) {
  try {
    const response = await fetch(`${API_URL}/api/signal`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pair })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

// Display Signal
function displaySignal(signal) {
  const colors = {
    "STRONG_BUY": "#4CAF50",
    "BUY": "#8BC34A",
    "NEUTRAL": "#9E9E9E",
    "SELL": "#FF9800",
    "STRONG_SELL": "#F44336"
  };

  resultDiv.innerHTML = `
    <div class="signal" style="border-color: ${colors[signal.signal]}">
      <h3>${signal.signal}</h3>
      <p>Confidence: ${signal.confidence}%</p>
      <small>${new Date(signal.timestamp).toLocaleString()}</small>
    </div>
  `;
}

// Event Listener
signalBtn.addEventListener('click', async () => {
  signalBtn.disabled = true;
  resultDiv.innerHTML = '<div class="loading">⌛ Loading...</div>';

  try {
    const signal = await fetchSignal(pairSelect.value);
    displaySignal(signal);
  } catch (error) {
    resultDiv.innerHTML = `<div class="error">❌ Error: ${error.message}</div>`;
  } finally {
    signalBtn.disabled = false;
  }
});