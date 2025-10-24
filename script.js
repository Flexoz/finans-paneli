async function fetchData() {
  try {
    // DÖVİZ verileri (USD, EUR)
    const res = await fetch("https://api.exchangerate.host/latest?base=USD&symbols=TRY,EUR");
    const data = await res.json();

    const usdTry = data.rates.TRY.toFixed(2);
    const eurTry = (data.rates.TRY / data.rates.EUR).toFixed(2);

    // ALTIN (ons USD -> gram TRY)
    const gramAltin = ((2350 / 31.1) * usdTry).toFixed(2); // yaklaşık değer

    // BTC verisi (USD üzerinden)
    const btcRes = await fetch("https://api.coindesk.com/v1/bpi/currentprice/USD.json");
    const btcData = await btcRes.json();
    const btcUsd = btcData.bpi.USD.rate_float;
    const btcTry = (btcUsd * usdTry).toFixed(0);

    // Ekrana yaz
    document.getElementById("usd").innerText = `💵 Dolar: ${usdTry} ₺`;
    document.getElementById("eur").innerText = `💶 Euro: ${eurTry} ₺`;
    document.getElementById("gram").innerText = `🥇 Gram Altın: ${gramAltin} ₺`;
    document.getElementById("btc").innerText = `₿ Bitcoin: ${btcTry} ₺`;

  } catch (error) {
    console.error("Veri alınamadı:", error);
    document.querySelector("h1").innerHTML = "Veri alınamadı 😔";
  }
}

fetchData();
