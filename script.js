async function fetchData() {
  const apiUrl = "https://api.exchangerate.host/latest?base=USD&symbols=TRY,EUR,BTC";

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    const usdTry = data.rates.TRY.toFixed(2);
    const eurTry = (usdTry / data.rates.EUR).toFixed(2);
    const btcTry = (usdTry * 0.000016).toFixed(2); // sembolik btc fiyatı

    document.getElementById("usd").innerText = `💵 Dolar: ${usdTry} ₺`;
    document.getElementById("eur").innerText = `💶 Euro: ${eurTry} ₺`;
    document.getElementById("btc").innerText = `₿ Bitcoin: ${btcTry} ₺`;
  } catch (error) {
    console.error("Veri alınamadı:", error);
    document.querySelector("h1").innerHTML = "Veri alınamadı 😔";
  }
}

fetchData();
