async function fetchData() {
  const apiUrl = "https://api.frankfurter.app/latest?from=USD&to=TRY,EUR";

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    const usdTry = data.rates.TRY.toFixed(2);
    const eurTry = data.rates.EUR.toFixed(2);

    document.getElementById("usd").innerText = `💵 Dolar: ${usdTry} ₺`;
    document.getElementById("eur").innerText = `💶 Euro: ${eurTry} ₺`;
    document.getElementById("btc").innerText = "₿ Bitcoin: ~1.600.000 ₺ (örnek)";
  } catch (error) {
    console.error("Veri alınamadı:", error);
    document.querySelector("h1").innerHTML = "Veri alınamadı 😔";
  }
}

fetchData();
