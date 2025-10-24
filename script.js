async function fetchData() {
  const apiUrl = "https://finans.truncgil.com/today.json";

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    document.getElementById("usd").innerText = `💵 Dolar: ${data.USD.Selling} ₺`;
    document.getElementById("eur").innerText = `💶 Euro: ${data.EUR.Selling} ₺`;
    document.getElementById("btc").innerText = `₿ Bitcoin: ${data.BTC.Selling} ₺`;
  } catch (error) {
    console.error("Veri alınamadı:", error);
    document.querySelector("h1").innerHTML = "Veri alınamadı 😔";
  }
}

fetchData();
