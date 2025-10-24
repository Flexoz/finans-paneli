async function fetchData() {
  const apiUrl = "https://api.genelpara.com/embed/para-birimleri.json";

  try {
    const response = await fetch(`https://cors-anywhere.herokuapp.com/${apiUrl}`, {
      headers: { "x-requested-with": "XMLHttpRequest" }
    });
    const data = await response.json();

    document.getElementById("usd").innerText = `💵 Dolar: ${data.USD.satis} ₺`;
    document.getElementById("eur").innerText = `💶 Euro: ${data.EUR.satis} ₺`;
    document.getElementById("btc").innerText = `₿ Bitcoin: ${data.BTC.satis} ₺`;
  } catch (error) {
    console.error("Veri alınamadı:", error);
    document.querySelector("h1").innerHTML = "Veri alınamadı 😔";
  }
}

fetchData();
