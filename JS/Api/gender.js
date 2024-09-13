async function getGender(name) {
  try {
    const response = await fetch(`https://api.coinpaprika.com/v1/coins/btc-bitcoin`);
    const data = await response.json();

    console.log(`Api : ${name} of ${data.name}, ${data.symbol} `);
    
  } catch (e) {
    console.log(e);
  }
}
getGender('btc-bitcoin');
