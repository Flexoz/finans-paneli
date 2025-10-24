async function fetchData() {
  try {
    const response = await fetch("https://open.er-api.com/v6/latest/USD");
    const data = await response.json();

    const usdTry = data.rates.TRY.toFixed(2);
    const eurTry = (data.rates.TRY / data.rates.EUR).toFixed(2);
    const btcTry = (usdTry * 0.000016).toFixed(2); // sembolik btc değeri

    document.getElementById("usd").innerText = `💵 Dolar: ${usdTry} ₺`;
    document.getElementById("eur").innerText = `💶 Euro: ${eurTry} ₺`;
    document.getElementById("btc").innerText = `₿ Bitcoin: ${btcTry} ₺`;
  } catch (error) {
    console.error("Veri alınamadı:", error);
    document.querySelector("h1").innerHTML = "Veri alınamadı 😔";
  }
}

fetchData();
