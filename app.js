const API_URL = "agile-delight-production.up.railway.app"; // Replace with your backend URL

document.getElementById('get-signal').addEventListener('click', async () => {
  const pair = document.getElementById('pair-select').value;
  const signal = await fetchSignal(pair);
  displaySignal(signal);
});

async function fetchSignal(pair) {
  const response = await fetch(`${API_URL}/api/signal`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pair }),
  });
  return response.json();
}

function displaySignal(signal) {
  const colors = {
    "STRONG_BUY": "darkgreen",
    "BUY": "lime",
    "SELL": "orange",
    "STRONG_SELL": "red",
    "NEUTRAL": "gray"
  };
  document.getElementById('signal-result').innerHTML = `
    <h3 style="color: ${colors[signal.signal]}">
      ${signal.signal} (${signal.confidence}%)
    </h3>
  `;
}