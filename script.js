async function fetchData() {
  try {
    // Döviz kurları (USD ve EUR)
    const forexRes = await fetch("https://open.er-api.com/v6/latest/USD");
    const forexData = await forexRes.json();

    const usdTry = forexData.rates.TRY.toFixed(2);
    const eurTry = (forexData.rates.TRY / forexData.rates.EUR).toFixed(2);

    // Bitcoin fiyatı (USD üzerinden)
    const btcRes = await fetch("https://api.coindesk.com/v1/bpi/currentprice/USD.json");
    const btcData = await btcRes.json();
    const btcUsd = btcData.bpi.USD.rate_float;
    const btcTry = (btcUsd * usdTry).toFixed(0);

    // Altın fiyatı (gram)
    const goldRes = await fetch("https://api.genelpara.com/embed/altin.json");
    const goldData = await goldRes.json();
    const gramAltin = goldData.GRAM.satis;

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
