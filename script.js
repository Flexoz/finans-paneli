async function fetchData() {
  try {
    // 1️⃣ Döviz kurları (dolar, euro)
    const forexRes = await fetch("https://api.exchangerate.host/latest?base=TRY&symbols=USD,EUR");
    const forexData = await forexRes.json();
    const usdTry = (1 / forexData.rates.USD).toFixed(2);
    const eurTry = (1 / forexData.rates.EUR).toFixed(2);

    // 2️⃣ Altın fiyatı (gram altın tahmini)
    // Ortalama ons altın = 2350 USD civarı → gram = ons/31.1 * USD
    const gramAltin = ((2350 / 31.1) * usdTry).toFixed(2);

    // 3️⃣ Bitcoin fiyatı (USD -> TRY)
    const btcRes = await fetch("https://api.coindesk.com/v1/bpi/currentprice/USD.json");
    const btcData = await btcRes.json();
    const btcUsd = btcData.bpi.USD.rate_float;
    const btcTry = (btcUsd * usdTry).toFixed(0);

    // 4️⃣ Ekrana yaz
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
