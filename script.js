async function fetchData() {
  try {
    // CORS'u otomatik çözen proxy
    const proxy = "https://corsproxy.io/?";
    const apiUrl = "https://api.genelpara.com/embed/para-birimleri.json";
    const btcUrl = "https://api.coindesk.com/v1/bpi/currentprice/TRY.json";

    // Döviz ve altın verileri
    const response = await fetch(proxy + encodeURIComponent(apiUrl));
    const data = await response.json();

    // Bitcoin verisi
    const btcResponse = await fetch(proxy + encodeURIComponent(btcUrl));
    const btcData = await btcResponse.json();

    // HTML'e yazdır
    document.getElementById("usd").textContent = `💵 Dolar: ${parseFloat(data.USD.satis).toFixed(2)} ₺`;
    document.getElementById("eur").textContent = `💶 Euro: ${parseFloat(data.EUR.satis).toFixed(2)} ₺`;
    document.getElementById("gram").textContent = `🪙 Gram Altın: ${parseFloat(data.GA.satis).toFixed(2)} ₺`;
    document.getElementById("ceyrek").textContent = `🥇 Çeyrek Altın: ${parseFloat(data.C.satis).toFixed(2)} ₺`;
    document.getElementById("btc").textContent = `₿ Bitcoin: ${btcData.bpi.TRY.rate_float.toLocaleString("tr-TR", { maximumFractionDigits: 0 })} ₺`;
  } 
  catch (err) {
    console.error("Veri alınamadı:", err);
    document.getElementById("usd").textContent = "Veri alınamadı 😔";
  }
}

// Sayfa açılır açılmaz veri çek
fetchData();
// Her 5 dakikada bir yenile
setInterval(fetchData, 300000);
