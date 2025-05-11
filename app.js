// 1. Hardcoded test version
document.getElementById('get-signal').onclick = async () => {
  const resultDiv = document.getElementById('signal-result');
  resultDiv.innerHTML = '<div style="color:blue">Testing connection...</div>';
  
  try {
    // Test GET first
    const testGet = await fetch('agile-delight-production.up.railway.app');
    if (!testGet.ok) throw new Error('Backend not reachable');
    
    // Test POST
    const response = await fetch('agile-delight-production.up.railway.app/api/signal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        pair: document.getElementById('pair-select').value 
      })
    });
    
    const data = await response.json();
    resultDiv.innerHTML = `
      <div style="
        border: 2px solid green;
        padding: 15px;
        margin: 10px;
        border-radius: 5px;
      ">
        <h3>Success!</h3>
        <pre>${JSON.stringify(data, null, 2)}</pre>
      </div>
    `;
  } catch (error) {
    resultDiv.innerHTML = `
      <div style="
        border: 2px solid red;
        padding: 15px;
        margin: 10px;
        border-radius: 5px;
      ">
        <h3>Error!</h3>
        <p>${error.message}</p>
        <p>Check console for details</p>
      </div>
    `;
    console.error('Full error:', error);
  }
};