async function fetchData() {
  try {
    // DÖVİZ
    const res = await fetch("https://api.exchangerate.host/latest?base=USD&symbols=TRY,EUR");
    const data = await res.json();

    const usdTry = data.rates.TRY.toFixed(2);
    const eurTry = (data.rates.TRY / data.rates.EUR).toFixed(2);
    const gramAltin = ((2350 / 31.1) * usdTry).toFixed(2); // yaklaşık altın hesap

    // BITCOIN
    const btcRes = await fetch("https://api.coindesk.com/v1/bpi/currentprice/USD.json");
    const btcData = await btcRes.json();
    const btcUsd = btcData.bpi.USD.rate_float;
    const btcTry = (btcUsd * usdTry).toFixed(0);

    // EKRANA YAZ
    document.getElementById("usd").innerText = `💵 Dolar: ${usdTry} ₺`;
    document.getElementById("eur").innerText = `💶 Euro: ${eurTry} ₺`;
    document.getElementById("gram").innerText = `🥇 Gram Altın: ${gramAltin} ₺`;
    document.getElementById("btc").innerText = `₿ Bitcoin: ${btcTry} ₺`;
  } catch (err) {
    document.querySelector("h1").innerHTML = "Veri alınamadı 😔";
    console.error("Hata:", err);
  }
}

fetchData();

// Haberleri çek
document.getElementById("newsBtn").addEventListener("click", async () => {
  const container = document.getElementById("newsContainer");
  container.innerHTML = "Yükleniyor...";

  try {
    const rssUrl = "https://rss.app/feeds/_FjVnZWxqDgV7dY9R.xml"; // Ekonomi RSS örnek
    const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`);
    const data = await res.json();

    container.innerHTML = data.items.slice(0, 5)
      .map(item => `<p>🔹 <a href="${item.link}" target="_blank">${item.title}</a></p>`)
      .join("");
  } catch (error) {
    container.innerHTML = "Haberler alınamadı 😔";
  }
});
